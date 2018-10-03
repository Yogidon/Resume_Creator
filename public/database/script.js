const URL = 'http://localhost:3000/show/';

$(document).ready(function(){
    makeRequest();

});

function makeRequest() {
    $.ajax({
        url: URL,
        method: 'GET',
        success: function(data) {
            console.log(data[0]);
            $('#data').append(
                '<div>' + data[0].name + '</div>' +
                '<div>' + data[0].age + '</div>' +
                '<div>' + data[0].course + '</div>'
            )
        }
    })
}