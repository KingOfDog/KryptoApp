var chars = "ABCDEFGHIKLMNOPQRSTUVWXYZ";

function unique(str) {
    var result = '';
    for (var i = 0; i < str.length; i++) {
        if (result.indexOf(str[i]) < 0) {
            result += str[i];
        }
    }
    return result;
}

function polybius(key) {
    key = unique(key.toUpperCase()
        .replace(/[Ä]/g, "AE")
        .replace(/[Ö]/g, "OE")
        .replace(/[Ü]/g, "UE")
        .replace(/[^A-IK-Z]/g, ""));
    var charsTemp = chars;
    for(var i = 0; i < key.length; i++) {
        charsTemp = charsTemp.replace(key.charAt(i), "");
    }
    key += charsTemp;

    var rows = new Array(5);
    var cols = new Array(5);
    var counter = 0;
    var counterCol = 0;
    for(var i = 0; i < 5; i++) {
        rows[i] = new Array(5);
        cols[i] = new Array(5);
        for(var j = 0; j < 5; j++) {
            rows[i][j] = key.charAt(counter++);
            cols[i][j] = key.charAt(counterCol);
            counterCol += 5;
            if(counterCol >= 25) {
                counterCol -= 24;
            }
        }
    }
    return [rows, cols];
}

function encrypt(key, text) {
    var poly = polybius(key);
    text = text.toUpperCase()
        .replace(/[Ä]/g, "AE")
        .replace(/[Ö]/g, "OE")
        .replace(/[Ü]/g, "UE")
        .replace(/[^A-Z]/g, "")
        .replace(/[J]/g, "X");

    for(var i = 0; i < text.length; i += 2) {
        if(text.charAt(i) === text.charAt(i + 1)) {
            text = text.slice(0, i + 1) + "X" + text.slice(i + 1, text.length);
        }
    }

    if(text.length % 2 !== 0) {
        text += "X";
    }

    var encryptedText = "";
    for(var i = 0; i < text.length; i += 2) {
        var foundA = false;
        var foundB = false;
        var a = [text.charAt(i)];
        var b = [text.charAt(i + 1)];
        var counter = 0;
        while(!foundA || !foundB) {
            for(var j = 0; j < 5; j++) {
                if(a[0] === poly[0][counter][j]) {
                    a[1] = counter;
                    a[2] = j;
                    foundA = true;
                }
                if(b[0] === poly[0][counter][j]) {
                    b[1] = counter;
                    b[2] = j;
                    foundB = true;
                }
            }
            counter++;
        }

        if(a[1] === b[1]) {
            encryptedText += poly[0][a[1]][(a[2] + 1) % 5];
            encryptedText += poly[0][b[1]][(b[2] + 1) % 5];
        } else if(a[2] === b[2]) {
            encryptedText += poly[0][(a[1] + 1) % 5][a[2]];
            encryptedText += poly[0][(b[1] + 1) % 5][b[2]];
        } else {
            encryptedText += poly[0][a[1]][b[2]];
            encryptedText += poly[0][b[1]][a[2]];
        }
    }

    return encryptedText;
}

function decrypt(key, text) {
    var poly = polybius(key);
    text = text.toUpperCase()
        .replace(/[Ä]/g, "AE")
        .replace(/[Ö]/g, "OE")
        .replace(/[Ü]/g, "UE")
        .replace(/[^A-Z]/g, "")
        .replace(/[J]/g, "X");
    if(text.length % 2 !== 0) {
        text += "X";
    }

    var decryptedText = "";
    for(var i = 0; i < text.length; i += 2) {
        var foundA = false;
        var foundB = false;
        var a = [text.charAt(i)];
        var b = [text.charAt(i + 1)];
        var counter = 0;
        while(!foundA || !foundB) {
            for(var j = 0; j < 5; j++) {
                if(a[0] === poly[0][counter][j]) {
                    a[1] = counter;
                    a[2] = j;
                    foundA = true;
                }
                if(b[0] === poly[0][counter][j]) {
                    b[1] = counter;
                    b[2] = j;
                    foundB = true;
                }
            }
            counter++;
        }

        if(a[1] === b[1]) {
            decryptedText += poly[0][a[1]][(a[2] + 4) % 5];
            decryptedText += poly[0][b[1]][(b[2] + 4) % 5];
        } else if(a[2] === b[2]) {
            decryptedText += poly[0][(a[1] + 4) % 5][a[2]];
            decryptedText += poly[0][(b[1] + 4) % 5][b[2]];
        } else {
            decryptedText += poly[0][a[1]][b[2]];
            decryptedText += poly[0][b[1]][a[2]];
        }
    }

    return decryptedText;
}

function encryptDecrypt() {
    if($('#decrypt').is(":checked")) {
        $('#encryptedText').val(decrypt($('#key-input').val(), $('#text-input').val()));
    } else {
        $('#encryptedText').val(encrypt($('#key-input').val(), $('#text-input').val()));
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