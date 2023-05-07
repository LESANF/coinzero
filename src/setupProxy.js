const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    // createProxyMiddleware("/api", {
    createProxyMiddleware("/korean", {
      //   target: "https://newsdata.io",
      target: "https://www.bbc.com",
      changeOrigin: true,
    })
  );
};
