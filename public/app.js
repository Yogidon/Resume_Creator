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
        }
    })
}
