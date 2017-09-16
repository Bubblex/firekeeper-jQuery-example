/**
 * reload 模块，使用该方法加载模块时
 * 都会重新加载，这样可以解决更新 Mock 后必须重启服务的问题
 */
const yod = require('yod-mock')
const Mock = require('./mock')
const reload = require('require-reload')(require)

function handleUrl(url) {
    if (url.indexOf('?') > -1) {
        return url.substring(0, url.indexOf('?'))
    }
    return url
}

/**
 * BrowserSync 的中间件，用于拦截请求以及返回假数据
 * @returns {Function} 适用于 middleware 的函数
 */
module.exports = function() {
    return function(req, res, next) {
        const mocks = reload('../../../config/mock')(Mock).mocks
        const method = req.method.toLowerCase()
        const url = method === 'get' ? handleUrl(req.url) : req.url
        if (mocks[method] && mocks[method][url]) {
            res.end(JSON.stringify(yod(mocks[method][url].template)))
            return false
        }
        next()
    }
}
