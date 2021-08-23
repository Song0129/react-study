const proxy = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		proxy("/api1", {
			//遇见/api1前缀的请求，就会触发该代理配置
			target: "http://localhost:5000",
			changeOrigin: true,
			pathRewrite: { "^/api1": "" },
		}),
		proxy("/api2", {
			target: "http://localhost:5001",
			changeOrigin: true,
			pathRewrite: { "^/api2": "" },
		})
	);
};
//
