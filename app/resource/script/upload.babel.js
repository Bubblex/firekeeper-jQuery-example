{
    $('.container').find('input').on('change', function(e) {
        e.preventDefault()
        
        const reader = new FileReader()
        const file = e.target.files[0]

        reader.onload = function() {
            $('.container').find('img').attr('src', reader.result)
        }
        reader.readAsDataURL(file)

        var formdata = new FormData()
        formdata.append('name', file)

        async.send('login', formdata, function(data) {
            console.log('发送清求...')
        })            
    })
}