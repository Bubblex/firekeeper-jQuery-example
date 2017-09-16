module.exports = (Mock) => {
    
    // 登录
    Mock.mock('/account/login', 'POST', {
        code: 1,
        token: '9obrej6un058xo4d1aw660tehshmas3t'
    })


    return Mock
}