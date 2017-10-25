class Async {
    DEFAULT = {
        type: 'GET',
        single: true,
        cache: false,
        dataType: 'json',
        response: null,
        success: (data) => {}
    }
    constructor() {
        this.sequence = {}
    }
    _add(option) {
        if (!option.name) {
            console.warn('参数 name 为空，该 Ajax 将不会被注册')
            return
        }
        this.sequence[option.name] = {
            ...this.DEFAULT,
            ...option
        }
    }
    getSequence() {
        return this.sequence
    }
    register(option) {
        if (typeof option === 'object') {
            if (option.length) {
                for (let i = 0, len = option.length; i < len; i++) {
                    this._add(option[i])
                }
            }
            else {
                this._add(option)
            }
        }
        else {
            console.warn('Fetch.register 只接受 Object 或 Array 类型的参数')
        }
    }
    send(obj, sendData, callback) {
        // 过滤 jQuery.ajax 不需要的参数
        const {
            name,
            cache,
            single,
            value,
            success,
            fetching,
            response,
            ...o
        } = this.sequence[obj]
        // 处理参数
        if (typeof sendData === 'function') {
            callback = sendData
        }
        if (!this.sequence[obj]) {
            console.warn(`${obj} 没有被注册`)
            return
        }
        if (response !== null && cache) {
            success(response)
            callback && callback(response)
            return
        }
        // 拦截请求
        // 如果该请求为单通道模式
        // 且尝试同时进行两次请求
        if (single && fetching) {
            console.warn(`${o.url} 正在尝试进行多次请求，已被拦截`)
            return
        }
        // 更改当前请求为正在请求状态
        this.sequence[obj].fetching = true
        // 重写 ajax 配置中的 success 等方法
        // 这样就可以调用不同的回调函数了
        const ajaxOption = {
            success: (data) => {
                this.sequence[obj].response = data
                success(data)
                callback && callback(data)
            },
            complete: () => {
                this.sequence[obj].fetching = false
            },
            ...o
        }
        // 如果想以新的参数进行请求
        if (sendData && typeof sendData === 'object') { ajaxOption.data = sendData }
        // 最终交给 jQuery.ajax 来完成
        $.ajax(ajaxOption)
    }
    getResponse(name) {
        return this.sequence[name].response
    }
}

const async = new Async()

async.register([
    // 登录
    {
        name: 'login',
        type: 'POST',
        url: `account/login`,
        // 必须false才会避开jQuery对 formdata 的默认处理 XMLHttpRequest会对 formdata 进行正确的处理
        processData: false,

        // 必须false才会自动加上正确的Content-Type
        contentType: false,
    }
])