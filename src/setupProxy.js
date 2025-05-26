const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',  // Все запросы, начинающиеся с /api
        createProxyMiddleware({
            target: 'http://localhost:3001', // Прокси на сервер с API
            changeOrigin: true,
        })
    );
};
