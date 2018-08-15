$(document).ready(() => {
   $('#submit').click(() => {
        const data = $('form').serializeArray();
       console.log(data);
       makeRequest();
   });

    $('a').click(() => {
        $(this).addClass('active');
    });

   function makeRequest() {
       $.ajax({
           url: '/submit',
           method: 'GET',
           data:{data : $('form').serializeArray() }
       })
   }
});