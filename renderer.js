let $ = require('jquery')

$(document).ready(function () {


    //Add user
    let name = $('#user_name').val()
    let age = $('#user_age').val()
    let phone = $("#user_phone").val()
    let interests = $(".user_interests :selected").text()
    let url = "http://localhost:8000/api/users/add?name"+name+"&age="+age+"&phone="+phone+"&interests="+interests
    $('#btn_send_add').on('click',  (e) => {
        e.preventDefault()
        let xhr = {
             url: url,
             method: 'GET',
             success: (data) => {
                 alert("Success")  
             }
        }
        $.ajax(xhr)
    })
    

})
 