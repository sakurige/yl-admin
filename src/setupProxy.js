const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://ceshi13.dishait.cn/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/",
      },
    }),
  );
};
