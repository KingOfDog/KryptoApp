$('#text-input').on('keyup', function () {
    atbash();
});

$('#encryptedText').click(function () {
    $('#encryptedText').select();
});

$('input[type=radio][name=encryptDecrypt]').change(function() {
    $('#text-input').val($('#encryptedText').val());
});

$('input').change(function () {
    atbash();
});

var atbash = function() {
    var f = $('#text-input').val();
    var e = "";
    for (var c = 0; c < f.length; c++) {
        var a = f.charCodeAt(c);
        if (a >= 97 && a <= 122) {
            e += String.fromCharCode(122 - a + 97);
        } else {
            if (a >= 65 && a <= 90) {
                e += String.fromCharCode(90 - a + 65)
            } else {
                e += String.fromCharCode(a)
            }
        }
    }
    $('#encryptedText').val(e);
};