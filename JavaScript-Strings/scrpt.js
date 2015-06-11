/*Problem 1. Reverse string

    Write a JavaScript function that reverses a string and returns it.
*/

function reverseString(str) {
    var result = '';
    for (var i = str.length - 1; i >= 0; i--) {
        result += str[i];
    }
    console.log('Original string: ' + str);
    console.log('Reversed string: ' + result);
}

/*Problem 2. Correct brackets

    Write a JavaScript function to check if in a given expression the brackets are put correctly.

Example of correct expression: ((a+b)/5-d). Example of incorrect expression: )(a+b)).
*/

function correctBrackets(expression) {
    var count = 0;
    for (var i = 0; i < expression.length; i++) {
        if (expression[i] === '(') {
            count++;
        }
        if (expression[i] === ')') {
            count--;
        }
    }
    if (count !== 0 || expression[0] === ')' || expression[expression.length - 1] === '(') {
        console.log('No, there is something wrong!');
    }
    else {
        console.log('The brackets are put correctly!');
    }
}

/*Problem 3. Sub-string in text

    Write a JavaScript function that fis how many times a substring is contained in a given text (perform case insensitive search).
*/
var str = 'We are living in an yellow submarine. We don\'t have anything else. ' +
    'Inside the submarine is very tight. So we are drinking all the day. ' +
    'We will move out of it in 5 days.';


function substringInText(str, substr) {
    var regex = new RegExp(substr, 'gi');
    console.log('The substring "' + substr + '" occures ' + (str.match(regex)).length + ' times');
}

/*Problem 4. Parse tags

    You are given a text. Write a function that changes the text in all regions:

    <upcase>text</upcase> to uppercase.
    <lowcase>text</lowcase> to lowercase
    <mixcase>text</mixcase> to mix casing(random)

*/

var text = 'We are <mixcase>living</mixcase> in a <upcase>yellow submarine</upcase>. ' +
    'We <mixcase>don\'t</mixcase> have <lowcase>anYTHing</lowcase> else.';

function parseTags(text) {
    var result = [],
		inputArr = text.split(''),
		tags = [],
		inTag = false,
		inClosingTag = false;

    for (var i = 0; i < inputArr.length; i++) {
        if (inputArr[i] === '<') {
            inTag = true;
            continue;
        }

        if (inputArr[i] === '/' && inTag) {
            inClosingTag = true;
            continue;
        }

        if (inTag && !inClosingTag && inputArr[i].match(/[a-z]/i)) {
            tags.push(inputArr[i]);
            continue;
        }

        if (inputArr[i] === '>') {
            if (inClosingTag) {
                tags.pop();
                inClosingTag = false;
            }
            inTag = false;
            continue;
        }

        if (!inTag) {
            if (!tags.length) {
                result.push(inputArr[i]);
            }
            else {
                switch (tags[0]) {
                    case 'L':
                        result.push(inputArr[i].toLowerCase());
                        break;
                    case 'U':
                        result.push(inputArr[i].toUpperCase());
                        break;
                    case 'M':
                        if (!Math.round(Math.random())) {
                            result.push(inputArr[i].toLowerCase());
                        } else {
                            result.push(inputArr[i].toUpperCase());
                        }
                        break;
                }
            }
        }
    }

    return result.join('');
}

function replaceTags(text) {
    text = text.replace(/<\s*upcase\s*>/gi, '<U>');
    text = text.replace(/<\s*\/upcase\s*>/gi, '</U>');
    text = text.replace(/<\s*lowcase\s*>/gi, '<L>');
    text = text.replace(/<\s*\/lowcase\s*>/gi, '</L>');
    text = text.replace(/<\s*mixcase\s*>/gi, '<M>');
    text = text.replace(/<\s*\/mixcase\s*>/gi, '</M>');

    return text;
}

function result() {
    console.log(text);
    text = replaceTags(text);
    text = parseTags(text);
    console.log(text);
}

/*Problem 5. nbsp

    Write a function that replaces non breaking white-spaces in a text with &nbsp;
*/

var text = 'We are   living in a yellow submarine. We don\'t have anything   else.';

function nbsp(text, toReplace, replacement) {
    var regex = new RegExp(toReplace, 'gi');
    console.log(text.replace(regex, replacement));
}

/*Problem 6. Extract text from HTML

    Write a function that extracts the content of a html page given as text.
    The function should return anything that is in a tag, without the tags.
*/

var html = '<html><head><title>Sample site</title></head><body><div>text<div>more text</div>and more...</div>in body</body></html>';

function extractTextFromHTML(html) {
    var result = html.replace(/<[^>]*>/g, '');
    console.log(result);
}

/*Problem 7. Parse URL

    Write a script that parses an URL address given in the format: [protocol]://[server]/[resource] and extracts from it the [protocol], [server] and [resource] elements.
    Return the elements in a JSON object.
*/

var url = 'http://telerikacademy.com/Courses/Courses/Details/239';

function parseURL(url) {
    var resultObj = {},
        formatedResult = '',
        firstSlash = url.iexOf('/'),
        secondSlash = url.iexOf('/', firstSlash + 1),
        thirdSlash = url.iexOf('/', secondSlash + 1);

    resultObj.protocol = url.substring(0, url.iexOf(':'));
    resultObj.server = url.substring(secondSlash + 1, thirdSlash);
    resultObj.resource = url.substring(thirdSlash);

    console.log(resultObj);
}

/*Problem 8. Replace tags

    Write a JavaScript function that replaces in a HTML document given as string all the tags <a href="…">…</a> with corresponding tags [URL=…]…/URL].
*/

String.prototype.htmlEscape = function () {
    var escapedStr = String(this).replace(/&/g, '&amp;');
    escapedStr = escapedStr.replace(/</g, '&lt;');
    escapedStr = escapedStr.replace(/>/g, '&gt;');
    escapedStr = escapedStr.replace(/"/g, '&quot;');
    escapedStr = escapedStr.replace(/'/g, '&#39');
    return escapedStr;
};

var paragraph = '<p>Please visit <a href="http://academy.telerik.com">our site</a> to choose a training course. Also visit <a href="www.devbg.org">our forum</a> to discuss the courses.</p>';

function replaceLinkTags(paragraph) {
    while (paragraph.iexOf('<a href') >= 0) {
        paragraph = paragraph.replace('<a href="', '[URL=')
            .replace('">', ']')
            .replace('</a>', '[/URL]');
    }
    paragraph.htmlEscape();
    console.log(paragraph);
}

/*Problem 9. Extract e-mails

    Write a function for extracting all email addresses from given text.
    All sub-strings that match the format @… should be recognized as emails.
    Return the emails as array of strings.
*/

var textWithEmails = '"gosho" <gosho@mail.com>, "pesho" <pesho@abv.com>, "tosho" <tosho@gmail.com>, ' +
    '"misho" <misho@yahoo.com>';

function getEmails(textWithEmails) {
    return textWithEmails.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    console.log(text);
}

/*Problem 10. Fi paliromes

    Write a program that extracts from a given text all paliromes, e.g. "ABBA", "lamal", "exe".
*/

var text = '"ABBA", "lamal", "exe", "sos", "not", "palirome", "test"';

function getResult() {
    console.log(extractPaliromes(text).join('; '));
}

function extractPaliromes(text) {
    var paliromes = [];
    var words = text.match(/\b\w+\b/g);

    for (var i in words) {
        if (isPlairome(words[i])) {
            paliromes.push(words[i]);
        }
    }

    return paliromes;
}

function isPlairome(word) {
    for (var i = 0; i < word.length / 2; i++) {
        if (word[i] !== word[word.length - i - 1]) {
            return false;
        }
    }
    return true;
}

/*Problem 11. String format

    Write a function that formats a string using placeholders.
    The function should work with up to 30 placeholders and all types.
*/

//Examples:

var str = stringFormat('Hello {0}!', 'Peter');
//str = 'Hello Peter!';

var frmt = '{0}, {1}, {0} text {2}';
var str = stringFormat(frmt, 1, 'Pesho', 'Gosho');
//str = '1, Pesho, 1 text Gosho'


function getFormatedString(str) {
    console.log(format(str));
}

function formatString() {
    var args = arguments;
    string = args[0],
		placeholder;

    for (var i = 1; i < args.length; i++) {
        placeholder = '{' + (i - 1) + '}';

        while (string.indexOf(placeholder) > -1) {
            string = string.replace(placeholder, args[i]);
        }
    }

    return string;
}

/*roblem 12. Generate list

    Write a function that creates a HTML <ul> using a template for every HTML <li>.
    The source of the list should be an array of elements.
    Replace all placeholders marked with –{…}– with the value of the corresponding property of the object.
*/



