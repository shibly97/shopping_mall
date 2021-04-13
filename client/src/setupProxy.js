const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

  app.use('/api/*',createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );

  app.use('/img/*',createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true
  }))


  app.use('/auth/*',createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true
  }))

  app.use('/upload/*',createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true
  }))

  app.use('/remove/*', createProxyMiddleware({
    target:'http://localhost:5000',
    changeOrigin: true
  }))
};

  