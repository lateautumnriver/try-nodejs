/**
 * parse JSON string asynchronously
 * @param json
 * @return {Promise<unknown>}
 */
'use strict'

function parseJsonAsync(json) {
    return new Promise((resolve, reject) =>
        setTimeout(() => {
            try {
                // change the status to fulfilled
                resolve((JSON.parse(json)))
            } catch (e) {
                // to rejected
                reject(e)
            }
        }, 1000)
    )
}

async function aparseJson(json) {
    return parseJsonAsync(json)
}

module.exports.parseJsonAsync = (s) => parseJsonAsync(s)
module.exports.aparseJson = (s) => aparseJson(s)

/**
 const jp = require('./src/intro/promise/json_parser')
 let p;
 p = jp.parseJsonAsync('{"a":"foo"}')
 // この p はPromiseオブジェクト
 // 1 second later
 console.log(p)

 // Promiseを返す関数はasync関数でなくてもawaitでき、パース結果を取得できる。
 p = await jp.parseJsonAsync('{"a":"foo"}')
 // この p はパースされたJSONオブジェクト
 console.log(p)

 p = await jp.aparseJson('{"a":"foo"}')
 // この p はパースされたJSONオブジェクト
 console.log(p)
 */
