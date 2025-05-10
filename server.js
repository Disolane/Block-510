const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({
origin: 'http://localhost:3000', 
methods: ['GET', 'POST']
  }));
app.use(express.json());

// Создаем подключение к базе данных
const db = new sqlite3.Database('./DB_Project.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных: ' + err.message);
    } else {
        console.log('Подключение к базе данных успешно установлено.');
    }
    
});

// API для получения всех корпусов
app.get('/api/buildings', (req, res) => {
    db.all('SELECT * FROM Buildings', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// API для получения конкретного корпуса по ID
app.get('/api/buildings/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM Buildings WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row || {});
    });
});

// Закрытие соединения при завершении процесса
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Ошибка при закрытии базы данных:', err.message);
        } else {
            console.log('Подключение к базе данных закрыто');
        }
        process.exit(0);
    });
});




// API для получения информации о мероприятии по ID
app.get('/api/events/:eventId', (req, res) => {
    const eventId = req.params.eventId;
  
    const query = `
      SELECT 
        e.ID as eventId, 
        e.NameOfTheEvent as eventName, 
        e.Description as eventDescription,
        e.Image as eventImage,
        c.ID as cabinetId,
        c.Name as cabinetName,
        c.Description as cabinetDescription,
        f.ID as floorId,
        f.Description as floorName,
        b.ID as buildingId,
        b.Name as buildingName,
        b.Address as buildingAddress
      FROM 
        Events e
        JOIN EventLocations el ON e.ID = el.EventID
        JOIN Cabinets c ON el.CabinetID = c.ID
        JOIN Floors f ON c.FloorID = f.ID
        JOIN Buildings b ON f.BuildingID = b.ID
      WHERE 
        e.ID = ?
    `;

    db.get(query, [eventId], (err, row) => {
      if (err) {
        console.error('Ошибка запроса:', err.message);
        return res.status(500).json({ error: 'Ошибка сервера' });
      }
      if (!row) {
        return res.status(404).json({ error: 'Мероприятие не найдено' });
      }
  
      // Формируем объект с данными
      const eventData = {
        id: row.eventId,
        title: row.eventName,
        description: row.eventDescription,
        image: row.eventImage, // Здесь нужно будет правильно формировать путь к изображению
        cabinet: {
          id: row.cabinetId,
          name: row.cabinetName,
          description: row.cabinetDescription,
          floor: {
            id: row.floorId,
            name: row.floorName,
            building: {
              id: row.buildingId,
              name: row.buildingName,
              address: row.buildingAddress
            }
          }
        }
      };
  
      res.json(eventData);
    });
  });
  // API для получения информации о корпусе по ID
app.get('/api/buildings/:buildingId', (req, res) => {
  const buildingId = req.params.buildingId;

  const query = `
    SELECT 
      b.ID as buildingId,
      b.Name as buildingName,
      b.Description as buildingDescription,
      b.Address as buildingAddress,
      b.Types as buildingTypes,
      b.Image as buildingImage
    FROM 
      Buildings b
    WHERE 
      b.ID = ?
  `;

  db.get(query, [buildingId], (err, row) => {
    if (err) {
      console.error('Ошибка запроса:', err.message);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Корпус не найден' });
    }

    // Формируем объект с данными о корпусе
    const buildingData = {
      id: row.buildingId,
      name: row.buildingName,
      description: row.buildingDescription,
      address: row.buildingAddress,
      types: row.buildingTypes,
      image: row.buildingImage, // Путь к изображению корпуса

    };

    res.json(buildingData);
  });
});
// API для получения списка этажей по ID корпуса
app.get('/api/buildings/:buildingId/floors', (req, res) => {
  const buildingId = req.params.buildingId;

  const query = `
    SELECT 
      f.ID as floorId,
      f.BuildingID as buildingId,
      f.Numb as floorNumber,
      f.Image as floorImage,
      f.Description as floorDescription
    FROM 
      Floors f
    WHERE 
      f.BuildingID = ?
    ORDER BY
      f.Numb ASC
  `;

  db.all(query, [buildingId], (err, rows) => {
    if (err) {
      console.error('Ошибка запроса:', err.message);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: 'Этажи для данного корпуса не найдены' });
    }

    // Формируем массив с данными о этажах
    const floorsData = rows.map(row => ({
      id: row.floorId,
      buildingId: row.buildingId,
      number: row.floorNumber,
      image: row.floorImage, // Путь к изображению этажа
      description: row.floorDescription
    }));

    res.json(floorsData);
  });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

