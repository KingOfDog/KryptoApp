function encrypt(key, text) {
    // Schlüssel und Text werden in Form gebracht (z.B. Umlaute und Leerzeichen entfernt und ersetzt)
    key = key.toUpperCase()
        .replace("Ö", "OE")
        .replace("Ü", "UE")
        .replace("Ä", "AE")
        .replace("ß", "SS")
        .replace(/[^A-Z]/g, "");
    text = text.toUpperCase()
        .replace("Ö", "OE")
        .replace("Ü", "UE")
        .replace("Ä", "AE")
        .replace("ß", "SS")
        .replace(/[^A-Z]/g, "");

    var counter = 0;
    var encryptedText = "";
    // Alle Buchstaben des Klartextes werden durchgegangen
    for(var i = 0; i < text.length; i++) {
        encryptedText += caesar(key.charCodeAt(counter++) - 65, false, text.charAt(i));
        if(counter >= key.length) {
            counter = 0;
        }
    }

    return encryptedText;
}

function decrypt(key, text) {
    // Schlüssel und Text werden in Form gebracht (z.B. Umlaute und Leerzeichen entfernt und ersetzt)
    key = key.toUpperCase()
        .replace("Ö", "OE")
        .replace("Ü", "UE")
        .replace("Ä", "AE")
        .replace("ß", "SS")
        .replace(/[^A-Z]/g, "");
    text = text.toUpperCase()
        .replace("Ö", "OE")
        .replace("Ü", "UE")
        .replace("Ä", "AE")
        .replace("ß", "SS")
        .replace(/[^A-Z]/g, "");

    var keys = [];
    for(var i = 0; i < key.length; i++) {
        keys[i] = key.charCodeAt(i) - 65;
    }

    var counter = 0;
    var decryptedText = "";
    // Alle Buchstaben des Geheimtextes werden durchgegangen
    for(var i = 0; i < text.length; i++) {
        decryptedText += caesar(keys[counter++], true, text.charAt(i));
        if(counter >= key.length)
            counter = 0;
    }

    return decryptedText;
}

function encryptDecrypt() {
    if($('#v-encrypt').is(":checked")) {
        $("#v-encryptedText").val(encrypt($('#v-key-input').val(), $('#v-text-input').val()));
    } else {
        $("#v-encryptedText").val(decrypt($('#v-key-input').val(), $('#v-text-input').val()));
    }
    if($('#v-key-input').val() === "" || $('#v-text-input').val() === "") {
        $('#v-encryptedText').val("");
    }
}

$('#v-text-input').on('keyup', function() {
    encryptDecrypt();
});

$('#v-key-input').on('keyup', function () {
    encryptDecrypt();
});

$('input[type=radio][name=vencryptDecrypt]').change(function() {
    $('#v-text-input').val($('#v-encryptedText').val());
});

$('input').change(function () {
    encryptDecrypt();
});

$('#v-encryptedText').click(function () {
    $('#v-encryptedText').select();
});