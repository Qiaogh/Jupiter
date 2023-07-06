const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/gw',
        createProxyMiddleware({
            target: 'http://localhost:8090',
            secret: false,
            changeOrigin: true,
            ws: true,
            logLevel: 'debug',
            pathRewrite: {
                '^/gw': ''
            },
            headers: {"X-TenantID": "test0"}
        })
    );
};
