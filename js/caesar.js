//Interaktion mit Nutzer
$('#text-input').on('keyup', function () {
    $('#encryptedText').val(caesar($('#key-input').val(), $('#decrypt').is(":checked"), $('#text-input').val()));
});

$('#encryptedText').click(function () {
    $('#encryptedText').select();
});

$('input[type=radio][name=encryptDecrypt]').change(function () {
    $('#text-input').val($('#encryptedText').val());
});

$('input').change(function () {
    if ($('#encryptedText').length !== 0)
        $('#encryptedText').val(caesar($('#key-input').val(), $('#decrypt').is(":checked"), $('#text-input').val()));
});

//Funktion zum Ver- und Entschlüsseln
//key = Schlüssel
//decrypt = Ver- oder Entschlüsseln?
//text = Klartext
var caesar = function (key, decrypt, text) {
    //Überprüfung ob Key nicht leer ist
    if (key === "") {
        key = 0;
    } else {
        key = parseInt(key) % 26;
    }
    var e = ""; //Verschlüsselter Text/Geheimtext
    //Überprüfung ob entschlüsselt werden soll
    if (decrypt) {
        key *= -1;
    }
    //Alle Buchstaben (Characters) des Klartextes werden durchgegangen
    for (var c = 0; c < text.length; c++) {
        var a = text.charCodeAt(c);
        if (a >= 97 && a <= 122) {
            e += String.fromCharCode(((a - 97 + key + 26) % 26) + 97);
        } else {
            if (a >= 65 && a <= 90) {
                e += String.fromCharCode(((a - 65 + key + 26) % 26) + 65);
            } else {
                e += String.fromCharCode(a);
            }
        }
    }
    return e;
};