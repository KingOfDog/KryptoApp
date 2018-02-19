var encrypt = function(key, text) {
    console.log(key);
    console.log(text);
    text = text.toUpperCase();
    text = text.replace(/\W|_/g, '');

    var rail = new Array(key);
    for(var i = 0; i < key; i++) {
        rail[i] = new Array(text.length);
    }

    for(var i = 0; i < key; i++) {
        for(var j = 0; j < text.length; j++) {
            rail[i][j] = '\n';
        }
    }

    var directionDown = false;
    var row = 0;
    var col = 0;

    for(var i = 0; i < text.length; i++) {
        if(row === 0 || row === key - 1) {
            directionDown = !directionDown;
        }
        rail[row][col++] = text.charAt(i);
        directionDown ? row++ : row--;
    }

    var result = "";
    for(var i = 0; i < key; i++) {
        for(var j = 0; j < text.length; j++) {
            if(rail[i][j] !== '\n') {
                result += rail[i][j];
            }
        }
    }

    return result;
};

var decrypt = function(key, text) {
    var rail = new Array(key);
    for(var i = 0; i < key; i++) {
        rail[i] = new Array(text.length);
    }

    for(var i = 0; i < key; i++) {
        for(var j = 0; j < text.length; j++) {
            rail[i][j] = '\n';
        }
    }

    var directionDown = false;
    var row = 0;
    var col = 0;

    for(var i = 0; i < text.length; i++) {
        if(row === 0 || row === key - 1) {
            directionDown = !directionDown;
        }
        rail[row][col++] = '*';
        directionDown ? row++ : row--;
    }

    var index = 0;
    for(var i = 0; i < key; i++) {
        for(var j = 0; j < text.length; j++) {
            if(rail[i][j] === '*' && index < text.length) {
                rail[i][j] = text.charAt(index++);
            }
        }
    }

    var result = "";
    directionDown = false;
    row = 0;
    col = 0;
    for(var i = 0; i < text.length; i++) {
        if(row === 0 || row === key - 1) {
            directionDown = !directionDown;
        }
        if(rail[row][col] !== '*') {
            result += rail[row][col++];
        }
        directionDown ? row++ : row--;
    }
    return result;
};

$('#text-input').on('keyup', function () {
    encryptDecrypt();
});

$('#key-input').on('keyup', function () {
    encryptDecrypt();
});

$('#key-input').on('change', function () {
    encryptDecrypt();
});

$('input[type=radio][name=encryptDecrypt]').change(function () {
    $('#text-input').val($('#encryptedText').val());
    encryptDecrypt();
});

function encryptDecrypt() {
    if($('#encrypt').is(':checked')) {
        $('#encryptedText').val(encrypt($('#key-input').val(), $('#text-input').val()));
    } else {
        $('#encryptedText').val(decrypt($('#key-input').val(), $('#text-input').val()));
    }
}

$('#encryptedText').click(function () {
    $('#encryptedText').select();
});