'use strict'
/**
 * 配置 Mock
 */
const Mock = {
    /**
     * 配置 mock
     * @param {String} url 配置拦截的请求地址
     * @param {String} method 配置请求的方式，可选参数：'get' 'post'
     * @param {Object} template 配置请求成功后返回的数据
     */
    mock: function(url, method, template) {
        method = method.toLowerCase()
        if (!this.mocks[method]) {
            this.mocks[method] = {}
        }
        this.mocks[method][url] = {
            template: template
        }
    },
    mocks: {}
}

module.exports = Mock
