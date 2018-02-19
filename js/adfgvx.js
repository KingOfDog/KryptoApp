var adfgvx = "adfgvx";
var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
var squareSize = 6;

function transpositionEncrypt(key) {
    var transpositionTable = new Array(key.length);
    for (var i = 0; i < transpositionTable.length; i++) {
        transpositionTable[i] = "";
    }
    return transpositionTable;
}

function encrypt(key1, key2, text) {
    //Schlüssel und Text werden formatiert (kleine Zeichen, nur A-Z und Zahlen)
    key1 = cleanAlphaNumeric(key1);
    key2 = cleanAlpha(key2);
    text = cleanAlphaNumeric(text);

    //Polybius-Quadrat wird erstellt
    var polybius = fillPolybius(key1);
    var textEncrypted1 = "";
    //Polybius-Quadrat wird genutzt zur Substitution
    for (var i = 0; i < text.length; i++) {
        var char = text.charAt(i);
        findChar: for (var j = 0; j < polybius.length; j++) {
            for (var k = 0; k < polybius[j].length; k++) {
                if (polybius[j][k] === char) {
                    textEncrypted1 += adfgvx.charAt(j) + adfgvx.charAt(k);
                    break findChar;
                }
            }
        }
    }

    //Transpositions-Tabelle wird erstellt und befüllt
    var textEncrypted2 = "";
    var trans = transpositionEncrypt(key2);
    for (var i = 0; i < textEncrypted1.length; i++) {
        trans[i % trans.length] += textEncrypted1.charAt(i);
    }
    //Sortierung
    var keySort = [];
    for (var i = 0; i < key2.length; i++) {
        keySort[i] = [key2.charAt(i), i];
    }
    keySort = keySort.sort();
    for (var i = 0; i < keySort.length; i++) {
        textEncrypted2 += trans[keySort[i][1]];
    }

    return textEncrypted2;
}

function decrypt(key1, key2, text) {
    key1 = cleanAlphaNumeric(key1);
    key2 = cleanAlpha(key2);
    text = cleanAlphaNumeric(text);

    const transposed = transposition(text, key2);
    console.log(transposed);
    return decryptPolybius(transposed, key1);
}

function decryptPolybius(text, key) {
    const square = createPolybiusSquare(key);
    console.log(text, square);
    function decryptPair(pair) {
        console.log(pair, pair[0], pair[1]);
        const row = adfgvx.indexOf(pair[0]);
        const col = adfgvx.indexOf(pair[1]);
        console.log(row, col);
        console.log(row * squareSize + col);
        return square[row * squareSize + col];
    }

    let result = '';
    for (let i = 0; i < text.length - 1; i += 2) {
        result += decryptPair(text.substr(i, 2));
    }
    return result;
}

function createPolybiusSquare(key) {
    return unique(key + chars);
}

function transposition(text, key) {
    const ordering = createOrderingTable(key);

    const length = text.length;
    const target = key.length;
    const buckets = new Array(target).fill('');

    let position = 0;
    for (let i = 0; i < target; i++) {
        let columnWidth = Math.floor(length / target);
        if (ordering[i] < length % target) {
            columnWidth++;
        }

        buckets[ordering[i]] = text.substr(position, columnWidth);
        position += columnWidth;
    }

    let result = '';
    for (let i=0; i < target + 1; i++) {
        result += buckets.map(row => row.charAt(i)).join('');
    }
    console.log(buckets);
    return result;
}

function cleanUmlauts(value) {
    return value.toLowerCase().replace(/[ä]/g, 'ae').replace(/[ö]/g, 'oe').replace(/[ü]/g, 'ue')
}

function cleanAlpha(value) {
    return cleanUmlauts(value).replace(/[^a-z]/g, '');
}

function cleanAlphaNumeric(value) {
    return cleanUmlauts(value).replace(/[^a-z0-9]/g, '');
}

function createOrderingTable(key) {
    let i = 0;
    return key.split('')
        .map(item => [item, i++])
        .sort()
        .map(item => item[1]);
}

function fillPolybius(key) {
    key = unique(key.toLowerCase());
    var charsTemp = chars;
    for (var i = 0; i < key.length; i++) {
        charsTemp = charsTemp.replace(key.charAt(i), '');
    }
    key += charsTemp;
    var polybius = new Array(6);
    var counter = 0;
    for (var i = 0; i < adfgvx.length; i++) {
        polybius[i] = new Array(6);
        for (var j = 0; j < adfgvx.length; j++) {
            polybius[i][j] = key.charAt(counter++);
        }
    }
    return polybius;
}

function unique(str) {
    var result = '';
    for (var i = 0; i < str.length; i++) {
        if (result.indexOf(str[i]) < 0) {
            result += str[i];
        }
    }
    return result;
}

$('#text-input').on('keyup', function () {
    if ($('#key-1-input').val() !== "" && $('#key-2-input').val() !== "") {
        encryptDecrypt();
    }
});

$('#key-1-input').on('keyup', function () {
    if ($('#key-1-input').val() !== "" && $('#key-2-input').val() !== "") {
        encryptDecrypt();
    }
});

$('#key-2-input').on('keyup', function () {
    if ($('#key-1-input').val() !== "" && $('#key-2-input').val() !== "") {
        encryptDecrypt();
    }
});

$('input[name=encryptDecrypt]').change(function() {
    $('#text-input').val($('#encryptedText').val());
    encryptDecrypt();
});

function encryptDecrypt() {
    if ($('#encrypt').is(':checked')) {
        $('#encryptedText').val(encrypt($('#key-1-input').val(), $('#key-2-input').val(), $('#text-input').val()).toUpperCase());
    } else {
        $('#encryptedText').val(decrypt($('#key-1-input').val(), $('#key-2-input').val(), $('#text-input').val()).toUpperCase());
    }
}