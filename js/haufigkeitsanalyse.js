$(document).ready(function () {
    for(var i = 65; i < 91; i++) {
        $('#letters').append("<tr id='" + String.fromCharCode(i).toLowerCase() + "'><td>" + String.fromCharCode(i) + "</td><td class='count-absolute'>0</td><td class='count-relative'>0.0%</td></tr>");
    }
});

$('#text-input').on('keyup', function () {
    var text = $('#text-input').val().toUpperCase();
    var words = text.split(' ').length;
    text = text.replace(/[ ,.;:\-_!\?\+#<>=\(\)\[\]{}%&$§"€@^°\/\\]/g, '');
    var totalCount = text.length;
    $('#totalCount').html(totalCount);
    $('#wordCount').html(words);
    var letters = [];
    for(var i = 0; i < 26; i++) {
        letters[i] = 0;
    }
    for(var j = 0; j < totalCount; j++) {
        var char = text.charCodeAt(j);
        if(64 < char < 91) {
            letters[char - 65] = letters[char - 65] + 1;
        } else {
            totalCount = totalCount - 1;
        }
    }
    for(var k = 0; k < 26; k++) {
        $('#letters #' + String.fromCharCode(k + 65).toLowerCase() + " .count-absolute").html(letters[k]);
        $('#letters #' + String.fromCharCode(k + 65).toLowerCase() + " .count-relative").html((letters[k] / totalCount * 100).toFixed(1) + "%");
    }
});