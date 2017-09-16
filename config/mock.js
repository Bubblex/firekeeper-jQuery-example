module.exports = (Mock) => {

    // 登录
    Mock.mock('/account/login', 'POST', {
        code: 1,
        name: '江肖',
        message: '登录成功'
        // code: 200,
        // message: '账号或密码错误'
    })

    return Mock
}