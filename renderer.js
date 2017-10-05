// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var $ = require('jQuery');

$(document).ready(function() {
    $("#button-login").click(function(ev) {
        ev.preventDefault();
        var url = "http://localhost:8000/api/users/login";
        var usernameData = $('#login-field').val();
        var passwordData = $('#password-field').val();
        var data = { login: usernameData, password: passwordData };
        $.post(
            url,
            data,
            function(response) {
                var message = '';
                if (response.login && response.password) {
                    message = "Succesful autorization";
                    $('#login-form').hide();
                    $('#login-result').html(message).show();
                } else if (!response.login) {
                    message = "Wrong login, please try again."
                    $('#login-result').html(message).show();
                } else if (!response.password) {
                    message = "Wrong password, please try again."
                    $('#login-result').html(message).show();
                }
            }
        );

    });
});