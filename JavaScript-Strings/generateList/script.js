/*Problem 12. Generate list

    Write a function that creates a HTML <ul> using a template for every HTML <li>.
    The source of the list should be an array of elements.
    Replace all placeholders marked with –{…}– with the value of the corresponding property of the object.

Example: HTML:

<div data-type="template" id="list-item">
 <strong>-{name}-</strong> <span>-{age}-</span>
/div>

JavaScript:

var people = [{name: 'Peter', age: 14},…];
var tmpl = document.getElementById('list-item').innerHtml;
var peopleList = generateList(people, template);
//peopleList = '<ul><li><strong>Peter</strong> <span>14</span></li><li>…</li>…</ul>'
*/

var people = [
    { name: 'Tosho', age: 37 },
    { name: 'Gosho', age: 42 },
    { name: 'Misho', age: 17 },
    { name: 'Pesho', age: 55 },
    { name: 'Tisho', age: 31 }],
	template = document.getElementById('list-item').innerHTML;

function generateList() {
    var ul = document.createElement('ul');

    for (var ind in people) {
        var li = document.createElement('li');
        li.innerHTML = format(template, people[ind]);
        ul.appendChild(li);
    }
    document.body.appendChild(ul);
};

function format(string, person) {
    return string.replace(/\-{(\w+)\}-/g, function (match, prop) {
        return person[prop] || '';
    });
}