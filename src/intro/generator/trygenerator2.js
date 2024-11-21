'use strict'
const jp = require('../promise/json_parser')

/**
 * ジェネレータ関数で非同期関数を呼び出す。
 */
function* generatorFunc(json_string) {
    try {
        console.log('input json string: ', json_string)
        const result = yield jp.parseJsonAsync(json_string)
        console.log('asynchronously parsed result:', result)
    } catch (error) {
        console.log('XXX caught error:', error)
    }
}

module.exports.generatorFunc = (json_string) => generatorFunc(json_string)

/**
 const g = require('./src/intro/generator/trygenerator2')
 const f = g.generatorFunc('{"a":"x"}')
 let st
 let p
 st = f.next()
 p = st.value
 // Promise{<pending>, ...}
 p.then(r => f.next(r))
 */
