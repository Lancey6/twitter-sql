var _ = require('underscore');

// global data array
var data = [{ id: 0, name: "David Reeve", text: "Hello, world!" },
            { id: 1, name: "David Reeve", text: "Goodbye, world!" } ];

// add an element to our data array
function add ( name, text ) {
  data.push( { id: data.length, name: name, text: text } );
}

// make a shallow copy of the data array
function list () {
  return _.clone( data );
}

// find an element in the data array
function find ( properties ) {
  return _.where( data, properties );
}

module.exports = {
  add: add,
  list: list,
  find: find
};

var randArrayEl = function( arr ) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getFakeName = function() {
  var fakeFirsts = ['Nimit', 'Dave', 'Will', 'Charlotte', 'Jacob','Ethan','Sophia','Emma','Madison'];
  var fakeLasts = ["Alley", 'Stacky', 'Fullstackerson', 'Nerd', 'Ashby', 'Gatsby', 'Hazelnut', 'Cookie', 'Tilde', 'Dash'];
    return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};

var getFakeTweet = function() {
  var awesome_adj = ['awesome','breathtaking','amazing','sexy','sweet','cool','wonderful','mindblowing'];
  return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};

for(var i=0; i<10; i++) {
  module.exports.add( getFakeName(), getFakeTweet() );
}

