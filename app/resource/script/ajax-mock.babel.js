;(function($) {
    $("[v-bind='LoginBtn']").on('click', function() {

        const username = $("[v-bind='Username']").val()
        const password = $("[v-bind='Password']").val()

        if (!username) {
            alert('请输入账号')
            return
        }
        else if (!password) {
            alert('请输入密码')
            return
        }
        
        const data = {
            username,
            password,
        }

        console.log('登录请求参数：')
        console.log(data)

        async.send('login', data, function(data) {
            console.log('登录返回参数：')
            console.log(data)

            const code = data.code

            if (code === 1) {
                alert(data.message)
            }
            else if (code === 200) {
                alert(data.message)
            }
        })
    })

})(jQuery)
