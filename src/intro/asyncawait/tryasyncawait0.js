/**
 * try async/await functions
 *
 * * Promiseを返す関数はなんでもawaitできる。
 * * awaitするとPromiseがresolveされるまで待つ。
 */
'use strict'
const jp = require('../promise/json_parser')

async function asyncFunc(json) {
    try {
        // awaitした値は、PromiseではなくPromiseがresolveされるのを待って、resolveされた値が入る。
        const resolved = await jp.parseJsonAsync(json)
        console.log('XXX: parsed: ', resolved)
        // ここでreturnされる値は、この関数が返すPromiseがresolveされた際の値になる。
        return resolved
    } catch (err) {
        console.log('XXX: error occurred: ', err)
        // TODO: エラーが発生した時、async関数はどのように振る舞うべきか？
        // * throw(err) する？
        // * await Promise.reject(err) する？
        // * return err する？　これだとこの関数が返すPromiseインスタンスはsettledにならない。
        throw err
    }
}

module.exports.asyncFunc = (json_string) => asyncFunc(json_string)

/**
 const a = require('./src/intro/asyncawait/tryasyncawait0')
 let p = a.asyncFunc('{"a":"x"}')
 */
