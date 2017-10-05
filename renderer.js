let $ = require('jquery')

$(document).ready(function () {
    let name = $('#user_name').val()
    let age = $('#user_age').val()
    let phone = $("#user_phone").val()
    let inter = $("#user_interests").val()
    let url = "http://localhost:8000/api/users"
    $('#btn_send_add').on('click',  (e) => {
        e.preventDefault()
        $.ajax({
            url: url,
            method: 'GET',
            success: (data) => {
                alert(data)  
            }
        })
          
    })
    

})
 