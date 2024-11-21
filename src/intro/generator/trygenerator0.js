/**
 * ジェネレータ関数の振る舞いの調査。
 * * yieldの戻り値はundefined。
 * * next()に引数がある場合は直前のnext()で実行されたyieldの戻り値が引数の値となる。
 */
function* generatorFunc() {
    //console.log('XXX: Start generator')
    //console.log('yield 1')
    let produced;
    produced = yield 1
    console.log('yield 1 returned', produced)
    produced = yield 2
    console.log('yield 1 returned', produced)
    produced = yield 3
    console.log('yield 1 returned', produced)
    return 'End of generator'
}

module.exports.generatorFunc = () => generatorFunc()

/**
 const trygen0 = require('./src/intro/generator/trygenerator0')
 const gf = trygen0.generatorFunc()
 let st = {done: false}
 while(st.done === false) {
     st = gf.next()
     console.log(st)
 }
 */
/**
 const trygen0 = require('./src/intro/generator/trygenerator0')
 const gf = trygen0.generatorFunc()
 for (const v of gf) {
     console.log('value: ', v)
 }
 */
