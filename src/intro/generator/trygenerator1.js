/**
 * ジェネレータ関数の `next()` に引数を渡す。
 * 取得できるyieldの戻り値は、そのyieldの戻り値ではなく、次に呼び出されたnext()に渡された値。
 * 直感に反するのは解釈の問題か。
 * 渡した値は「直前に実行されたyieldの戻り値として取得できる」と解釈すれば分かりやすい？（「ハンズオンNode.js」より。）
 * 1回目のnext()に渡した値は取得できない。
 * 2回目以降のnext()に渡した値は、その時に実行される処理の前に評価することができる。
 * 1回目のnext()の実行時に評価したい場合は、関数の引数に渡せばよい、ということ？
 * 1回目のnext()の実行時に評価したい値があるケースもありそうだが。
 * 予めジェネレータを作らず、実行時（next()を呼び出す直前）にジェネレータ関数を呼び出す、ってこと？
 */

function* generatorFunc() {
    let received = false;
    console.log('1回目のnext()。yield 1まで実行。')
    console.log('1回目のnext()に渡した値は取得できない。')
    received = yield 1
    console.log('2回目のnext()に渡した値: ', received)
    received = yield 2
    console.log('3回目のnext()に渡した値: ', received)
    received = yield 3
    console.log('4回目のnext()に渡した値: ', received)
    received = yield 4
    console.log('5回目のnext()に渡した値: ', received)
}

module.exports.generatorFunc = () => generatorFunc()

/**
 const tg1 = require('./src/intro/generator/trygenerator1')
 const gf = tg1.generatorFunc()
 let st;
 st = gf.next('foo')
 st = gf.next(true)
 */
