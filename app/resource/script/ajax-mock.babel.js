(function() {
    $("[v-bind='LoginBtn']").on('click', function() {

        const username = $("[v-bind='Username']").val()
        const password = $("[v-bind='Password']").val()

        
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
                console.log('登录成功')
            }
        })
    })

})()