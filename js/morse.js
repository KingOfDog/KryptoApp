$('#text-input').on('keyup', function () {
    morse();
});

$('#encryptedText').click(function () {
    $('#encryptedText').select();
});

$('input[type=radio][name=encryptDecrypt]').change(function () {
    $('#text-input').val($('#encryptedText').val());
});

$('input').change(function () {
    morse();
});

var alphabet = [];
alphabet['A'] = "·− ";
alphabet['B'] = "−··· ";
alphabet['C'] = "−·−· ";
alphabet['D'] = "−·· ";
alphabet['E'] = "· ";
alphabet['F'] = "··−· ";
alphabet['G'] = "−−· ";
alphabet['H'] = "···· ";
alphabet['I'] = "·· ";
alphabet['J'] = "·−−− ";
alphabet['K'] = "−·− ";
alphabet['L'] = "·−·· ";
alphabet['M'] = "−− ";
alphabet['N'] = "−· ";
alphabet['O'] = "−−− ";
alphabet['P'] = "·−−· ";
alphabet['Q'] = "−−·− ";
alphabet['R'] = "·−· ";
alphabet['S'] = "··· ";
alphabet['T'] = "− ";
alphabet['U'] = "··− ";
alphabet['V'] = "···− ";
alphabet['W'] = "·−− ";
alphabet['X'] = "−··− ";
alphabet['Y'] = "−·−− ";
alphabet['Z'] = "−−·· ";
alphabet['1'] = "·−−−− ";
alphabet['2'] = "··−−− ";
alphabet['3'] = "···−− ";
alphabet['4'] = "····− ";
alphabet['5'] = "····· ";
alphabet['6'] = "−···· ";
alphabet['7'] = "−−··· ";
alphabet['8'] = "−−−·· ";
alphabet['9'] = "−−−−· ";
alphabet['0'] = "−−−−− ";
alphabet['À'] = "·−−·− ";
alphabet['Å'] = "·−−·− ";
alphabet['Ä'] = "·−·− ";
alphabet['È'] = "·−··− ";
alphabet['É'] = "··−·· ";
alphabet['Ö'] = "−−−· ";
alphabet['Ü'] = "··−− ";
alphabet['ß'] = "···−−·· ";
alphabet['CH'] = "−−−− ";
alphabet['Ñ'] = "−−·−− ";
alphabet['.'] = "·−·−·− ";
alphabet[','] = "−−··−− ";
alphabet[':'] = "−−−··· ";
alphabet[';'] = "−·−·−· ";
alphabet['?'] = "··−−·· ";
alphabet['-'] = "−····− ";
alphabet['_'] = "··−−·− ";
alphabet['('] = "−·−−· ";
alphabet[')'] = "−·−−·− ";
alphabet['\''] = "·−−−−· ";
alphabet['= '] = "−···− ";
alphabet['+'] = "·−·−· ";
alphabet['/'] = "−··−· ";
alphabet['@'] = "·−−·−· ";
alphabet[' '] = "_ ";

var inversedAlphabet = [];
inversedAlphabet['·−'] = "A";
inversedAlphabet['−···'] = "B";
inversedAlphabet['−·−·'] = "C";
inversedAlphabet['−··'] = "D";
inversedAlphabet['·'] = "E";
inversedAlphabet['··−·'] = "F";
inversedAlphabet['−−·'] = "G";
inversedAlphabet['····'] = "H";
inversedAlphabet['··'] = "I";
inversedAlphabet['·−−−'] = "J";
inversedAlphabet['−·−'] = "K";
inversedAlphabet['·−··'] = "L";
inversedAlphabet['−−'] = "M";
inversedAlphabet['−·'] = "N";
inversedAlphabet['−−−'] = "O";
inversedAlphabet['·−−·'] = "P";
inversedAlphabet['−−·−'] = "Q";
inversedAlphabet['·−·'] = "R";
inversedAlphabet['···'] = "S";
inversedAlphabet['−'] = "T";
inversedAlphabet['··−'] = "U";
inversedAlphabet['···−'] = "V";
inversedAlphabet['·−−'] = "W";
inversedAlphabet['−··−'] = "X";
inversedAlphabet['−·−−'] = "Y";
inversedAlphabet['−−··'] = "Z";
inversedAlphabet['·−−−−'] = "1";
inversedAlphabet['··−−−'] = "2";
inversedAlphabet['···−−'] = "3";
inversedAlphabet['····−'] = "4";
inversedAlphabet['·····'] = "5";
inversedAlphabet['−····'] = "6";
inversedAlphabet['−−···'] = "7";
inversedAlphabet['−−−··'] = "8";
inversedAlphabet['−−−−·'] = "9";
inversedAlphabet['−−−−−'] = "0";
inversedAlphabet['·−−·−'] = "À";
inversedAlphabet['·−·−'] = "Ä";
inversedAlphabet['·−··−'] = "È";
inversedAlphabet['··−··'] = "É";
inversedAlphabet['−−−·'] = "Ö";
inversedAlphabet['··−−'] = "Ü";
inversedAlphabet['···−−··'] = "ß";
inversedAlphabet['−−−−'] = "CH";
inversedAlphabet['−−·−−'] = "Ñ";
inversedAlphabet['·−·−·−'] = ".";
inversedAlphabet['−−··−−'] = ",";
inversedAlphabet['−−−···'] = ":";
inversedAlphabet['−·−·−·'] = ";";
inversedAlphabet['··−−··'] = "?";
inversedAlphabet['−····−'] = "-";
inversedAlphabet['··−−·−'] = "_";
inversedAlphabet['−·−−·'] = "(";
inversedAlphabet['−·−−·−'] = ")";
inversedAlphabet['·−−−−·'] = "'";
inversedAlphabet['−···−'] = "=";
inversedAlphabet['·−·−·'] = "+";
inversedAlphabet['−··−·'] = "/";
inversedAlphabet['·−−·−·'] = "@";
inversedAlphabet['_'] = " ";

var morse = function () {
    var t = $('#text-input').val();
    var d = $('#decrypt').is(':checked');
    var r = "";
    t = t.replace(/!/g, '.');
    if(d) {
        t = t.replace(/\./g, '·');
        t = t.replace(/\-/g, '−');
        $('#text-input').val(t);
        var l = t.split(' ');
        for(var i = 0; i < l.length; i++) {
            r += inversedAlphabet[l[i]];
        }
    } else {
        t = t.toUpperCase();
        for(var i = 0; i < t.length; i++) {
            r += alphabet[t[i]];
        }
        r = r.slice(0, -1);
    }
    $('#encryptedText').val(r);
};