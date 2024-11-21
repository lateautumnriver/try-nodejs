/**
 * try async programing
 *
 * ポイント）
 * 1. Promiseインスタンスを返すと非同期関数になる。
 * 2. resolve()に渡した値がthen()のコールバック関数の引数になる。
 * 3. reject()に渡したエラーはcatch()のコールバック関数の引数になる。
 * 4. then()のコールバックが返す値はthen()のチェーンのコールバックに渡すことができる。
 * 5. finally()のコールバック関数は最後に必ず実行される。
 * 6. then(), catch(), finally() 各メソッドはPromiseインスタンスを返す。
 * 7. Promiseの各メソッドが返すPromiseインスタンスは、rejectedの時は元のPromiseインスタンスのエラーを引き継いでいる。
 * 8. Promiseの各メソッドが返すPromiseインスタンスは、fulfilledの時はfinally()以外は元のPromiseインスタンスのfulfilledを引き継いでいる。
 */

function promise_then_catch_finally() {
    const p1 = parse_json_async('{"foo": 1}')
    const r1 = p1.then(parse_ok)
        .then(log_value)
        .then(get_foo)
        .then(log_value)
        .catch(on_error)
        .finally(on_finally)
    console.log('*** Promise 1 created. ***')
    console.log(p1)

    const p2 = parse_json_async('{"foo": 2')
    const r2 = p2.then(parse_ok)
        .then(log_value)
        .then(get_foo)
        .then(log_value)
        .catch(on_error)
        .finally(on_finally)
    console.log('*** Promise 2 created. ***')
    console.log(p2)

    const p3 = parse_json_async('{"bar": 3}')
    const r3 = p3.then(parse_ok)
        .then(log_value)
        .then(get_foo)
        .then(log_value)
        .catch(on_error)
        .finally(on_finally)
    console.log('*** Promise 3 created. ***')
    console.log(p3)

    console.log('')
    console.log('*** async function proceeding ***')
    console.log('')

    setTimeout(() => {
        console.log('*** after 1 second, p1, p2, p3, r1, r2, r3 ***')
        // p*は最初のPromiseで、その値は最初にresolve()に渡された値。
        console.log(p1)
        console.log(p2)
        console.log(p3)
        // r*はresolve()された場合は最後にresolve()されたPromiseで値は最後にresolve()に渡された。
        // reject()された場合、Promiseの値はcatch()に渡されたコールバック関数が返す値。
        console.log(r1)
        console.log(r2)
        console.log(r3)
    }, 1000)
}

/**
 * then(), catch(), finally() はそれぞれがPromiseインスタンスを返す。
 */
function each_promise() {
    const s = '{"bar": 4}'
    const p4 = parse_json_async(s)
    const p5 = p4.then(parse_ok)
    const p6 = p5.then(log_value)
    const p7 = p6.then(get_foo)
    const p8 = p7.then(log_value)
    const p9 = p8.catch(on_error)
    const p10 = p9.finally(on_finally)
    console.log('*** Promise 4 created. ***')
    console.log('p4 = ', p4)
    console.log('p5 = ', p5)
    console.log('p6 = ', p6)
    console.log('p7 = ', p7)
    console.log('p8 = ', p8)
    console.log('p9 = ', p9)
    console.log('p10 = ', p10)

    console.log('async function is processing.')

    setTimeout(() => {
        console.log('*** after 1 second ***')
        console.log('p4 = ', p4)
        console.log('p5 = ', p5)
        console.log('p6 = ', p6)
        console.log('p7 = ', p7)
        console.log('p8 = ', p8)
        console.log('p9 = ', p9)
        console.log('p10 = ', p10)
    }, 1000)
}

/**
 * main function
 */
function main() {
    // promise_then_catch_finally()
    each_promise()
}

/**
 * Synchronously parse JSON string
 * @param json JSON string
 * @return {any}
 */
function parse_json(json) {
    return JSON.parse(json)
}


/**
 * Promiseを返す非同期JSONパーサーを呼び出す。
 * @param json JSON string
 * @return {Promise} JSONをパースする非同期関数のPromiseインスタンス
 */
function parse_json_async(json) {
    return delegate_parse(json)
}

/**
 * Delegate a procedure that takes some amount of time
 * I/O待ちとなるJSONパーサーに処理を引き渡す。
 * @param json string
 * @return {Promise} Promiseインスタンスを返す。
 */
function delegate_parse(json) {
    return new Promise((resolve, reject) => {
        // 時間のかかる処理をエミュレート
        setTimeout(() => {
            try {
                const d = parse_json(json)
                // ポイント）
                // resolve()に渡した値がPromise.then()のコールバックの引数に渡される。
                resolve(d)
            } catch (e) {
                // ポイント）
                // reject()に渡した値がPromise.catch()のコールバックの引数に渡される。
                reject(e)
            }
        }, 1000)
    })
}

/**
 * パース成功したことをログ出力
 * @param value {any} オブジェクト
 */
function parse_ok(value) {
    console.log('on fulfilled: parse OK: ', value)
    return value
}

/**
 * 値をログ出力
 * @param value {any} ログ出力する値
 * @return value {any} 渡された値をそのまま返す。
 */
function log_value(value) {
    console.log('on fulfilled: log_value: ', value)
    return value
}

/**
 * fooの値を取り出す
 * @param value {any} オブジェクト
 * @return {any} fooの値
 */
function get_foo(value) {
    console.log('on fulfilled: get_foo: ', value)
    if (value.foo === undefined) {
        throw SyntaxError(value)
    }
    return value.foo
}

/**
 * パースに失敗した時の処理
 * @param e {Error} エラーインスタンス
 */
function on_error(e) {
    console.log('on error because of: ', e)
    return e
}

/**
 * パース後の処理の後で実行する処理
 */
function on_finally() {
    console.log('on finally.')
    console.log('')
    return 'done'
}

main()
