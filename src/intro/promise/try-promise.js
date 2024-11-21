'use strict'
const jsonParser = require('./json_parser')

// run
const p1 = jsonParser.parseJsonAsync('{"foo": 1}')
const p2 = jsonParser.parseJsonAsync('A string here.')
console.log('***** XXX: Promise just created. *****')
console.log(p1)
console.log(p2)
setTimeout(() => {
    console.log('***** XXX: 1 second later. *****')
    console.log(p1)
    console.log(p2)
}, 1000)
