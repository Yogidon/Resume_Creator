const URL = 'http://localhost:3000/api/database';

$(document).ready(function(){
    makeRequest();
});

function makeRequest() {
    $.ajax({
        url: URL,
        method: 'GET',
        success: function(data) {
            console.log(data);
            $('#data').append(
                '<div>' + data.name + '</div>' +
                '<div>' + data.course + '</div>'
            )
        }
    })
}