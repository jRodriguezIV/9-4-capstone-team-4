
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/maps', // This should match the path you set in your backend proxy middleware
    createProxyMiddleware({
      target: 'http://localhost:7777', 
      changeOrigin: true,
    })
  );
};
