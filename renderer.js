let $ = require('jquery')

$(document).ready(function () {
    let name = $('#user_name').val()
    let age = $('#user_age').val()
    let phone = $("#user_phone").val()
    let interests = $("#user_interests option:selected").text()
    $('#btn_send_add').on('click',  (e) => {
        e.preventDefault()
        $.ajax({
            url: "http://localhost:8000/api/users/add?name"+name+"&age="+age+"&phone="+phone+"&interests="+interests,
            method: 'GET',
            success: (data) => {
                alert("Success")  
            }
        })
          
    })
    

})
 