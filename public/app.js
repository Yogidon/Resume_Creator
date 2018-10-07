$(document).ready(() =>{
    $('#checkbox').click(() =>{
        var type = $('#password').attr("type");
        if( type === 'password' ){
            $('#password').attr("type", "text");
        }else{
            $('#password').attr("type", "password");
        }
    })
    
});