var chars = 'abcdefghijklmnopqrstuvwxyz';

function unique(str) {
    var result = '';
    for (var i = 0; i < str.length; i++) {
        if (result.indexOf(str[i]) < 0) {
            result += str[i];
        }
    }
    return result;
}

function encrypt(key, text) {
    key = unique(key.toLowerCase())
        .replace(/[^a-z]/g, "");
    text = text.toLowerCase()
        .replace(/[^a-z]/g, "");
    var charsTemp = chars;
    for(var i = 0; i < key.length; i++) {
        charsTemp = charsTemp.replace(key.charAt(i), "");
    }
    key += charsTemp;

    var encryptedText = "";
    for(var i = 0; i < text.length; i++) {
        encryptedText += key.charAt(text.charCodeAt(i) - 97);
    }

    return encryptedText.toUpperCase();
}

function decrypt(key, text) {
    key = unique(key.toLowerCase())
        .replace(/[^a-z]/g, "");
    text = text.toLowerCase()
        .replace(/[^a-z]/g, "");
    var charsTemp = chars;
    for(var i = 0; i < key.length; i++) {
        charsTemp = charsTemp.replace(key.charAt(i), "");
    }
    key += charsTemp;

    var decryptedText = "";
    for(var i = 0; i < text.length; i++) {
        decryptedText += String.fromCharCode(key.indexOf(text.charAt(i)) + 97);
    }

    return decryptedText.toUpperCase();
}

function encryptDecrypt() {
    if($('#encrypt').is(':checked')) {
        $('#encryptedText').val(encrypt($('#key-input').val(), $('#text-input').val()));
    } else {
        $('#encryptedText').val(decrypt($('#key-input').val(), $('#text-input').val()));
    }
}

$('#text-input').on('keyup', function () {
    encryptDecrypt();
});

$('#key-input').on('keyup', function() {
    encryptDecrypt();
});

$('input[type=radio][name=encryptDecrypt]').change(function () {
    $('#text-input').val($('#encryptedText').val());
    encryptDecrypt();
});