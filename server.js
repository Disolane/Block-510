const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({
origin: 'http://localhost:3001', 
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

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});