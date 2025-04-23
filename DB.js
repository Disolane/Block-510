const sqlite3 = require('sqlite3').verbose(); 

// Создаем подключение к базе данных
const db = new sqlite3.Database('./DB_Project.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных: ' + err.message);
    } else {
        console.log('Подключение к базе данных успешно установлено.');
    }
});


db.close((err) => {
    if (err) {
        console.error('Ошибка при закрытии базы данных: ' + err.message);
    } else {
        console.log('Подключение к базе данных закрыто.');
    }
});