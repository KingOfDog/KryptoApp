$('#text-input').on('keyup', function () {
    console.log('test');
    fleissner();
});

var fleissner = function () {
    var t = $('#text-input').val();
    var size = Math.ceil(Math.sqrt(t.length));
    console.log(size);
    $('#text-container').empty();
    $('#theme-container').empty();
    for(var i = 0; i < size; i++) {
        $('#text-container').append("<tr id='text-row-" + i + "'></tr>");
        $('#theme-container').append("<tr id='theme-row-" + i + "'></tr>");
        for(var j = 0; j < size; j++) {
            $('#text-row-' + i).append("<td id='text-row-" + i +"-col-" + j + "'></td>");
            $('#theme-row-' + i).append("<td id='theme-row-" + i +"-col-" + j + "'></td>");
        }
    }
};