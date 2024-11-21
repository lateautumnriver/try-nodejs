/**
 * Todo-app server
 */
'use strict';
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let todos = [
    {id: 1, title: 'foo', completed: false},
    {id: 2, title: 'bar', completed: true},
]
// todo identifier
let todo_id_counter = 2


/**
 * Error handler
 * @param err
 * @param req
 * @param res
 * @param next
 */
function error_handler(err, req, res, next) {
    console.error('ZZZ:', err)
    res.status(err.statusCode || 500).json({error: err.message})
}

/**
 * Functions for todos
 */
function get_todos(req, res, next) {
    if (!req.query.completed) {
        return res.json(todos)
    }
    // if completed is specified, filter todos
    const completed = req.query.completed === 'true'
    return res.json(todos.filter(todo => todo.completed === completed))
}

function get_a_todo(req, res, next) {
    if (!req.params.hasOwnProperty('todo_id')) {
        console.log('Since no todo_id is specified, all todos are returned.')
        return get_todos(res, req)
    }
    const todo_id = Number(req.params.todo_id)
    const candidates = todos.filter(todo => todo.id === todo_id)
    if (candidates.length > 0) {
        return res.json(candidates.pop())
    }
    const err = new Error('ID is not found')
    err.statusCode = 404
    return next(err)
}

function post_a_todo(req, res, next) {
    const {title} = req.body
    if (typeof title !== 'string' || !title) {
        // if the request body does not contain a title, or the title is not a string, return 400 (Bad request)
        const err = new Error('title is required')
        err.statusCode = 400
        return next(err)
    }
    // Create a new todo
    const todo = {
        id: todo_id_counter += 1,
        title: title,
        completed: false
    }
    todos.push(todo)
    if (title === 'error') {
        throw Error("XXX: testing error")
    }
    res.status(201).json(todos)
}

function complete_a_todo(req, res, next) {
    if (!req.params.hasOwnProperty('todo_id')) {
        const err = new Error('ID is not found')
        err.statusCode = 404
        return next(err)
    }
    const todo_id = Number(req.params.todo_id)
    const candidates = todos.filter(todo => todo.id === todo_id)
    if (candidates.length > 0) {
        const todo = candidates.pop()
        todo.completed = true
        return res.json(todo)
    }
    const err = new Error('ID is not found')
    err.statusCode = 404
    return next(err)
}

function delete_a_todo(req, res, next) {
    if (!req.params.hasOwnProperty('todo_id')) {
        const err = new Error('ID is not found')
        err.statusCode = 404
        return next(err)
    }
    const todo_id = Number(req.params.todo_id)
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === todo_id) {
            todos.splice(i, 1)
            return res.json(todos)
        }
    }
    const err = new Error('ID is not found')
    err.statusCode = 404
    return next(err)
}

/**
 * TODO:
 * - Implement a middleware for '/api/todos/:id' to retrieve a todo object and set it to req.todo.
 * - Move the functions above to other source files.
 * - Make a function that sets routes defined below.
 * - Learn how to do unit tests and do the tests.
 */
app.get('/api/todos', get_todos)
app.get('/api/todos/:todo_id', get_a_todo)
app.post('/api/todos', post_a_todo)
app.put('/api/todos/:todo_id/completed', complete_a_todo)
app.delete('/api/todos/:todo_id', delete_a_todo)
app.use(error_handler)
app.listen(port)

/**
 * NOTE: ここまで確認済み。
 *
 * ========================================================
 * SAMPLE:
 * ========================================================
 * curl -iI 'http://localhost:3000/'
 * HTTP/1.1 404 Not Found
 * X-Powered-By: Express
 * Content-Security-Policy: default-src 'none'
 * X-Content-Type-Options: nosniff
 * Content-Type: text/html; charset=utf-8
 * Content-Length: 140
 * Date: Mon, 28 Oct 2024 02:31:21 GMT
 * Connection: keep-alive
 * Keep-Alive: timeout=5
 *
 * curl -i 'http://localhost:3000/api/todos'
 * HTTP/1.1 200 OK
 * X-Powered-By: Express
 * Content-Type: application/json; charset=utf-8
 * Content-Length: 82
 * ETag: W/"52-X+WO6TozD9c7wdV8oa9ioDeZp/E"
 * Date: Mon, 28 Oct 2024 02:32:26 GMT
 * Connection: keep-alive
 * Keep-Alive: timeout=5
 *
 * [{"id":1,"title":"foo","completed":false},{"id":2,"title":"bar","completed":true}]
 *
 * curl -i -X POST -H 'Content-Type:application/json' -d '{"title":"test"}' 'http://localhost:3000/api/todos'
 * HTTP/1.1 201 Created
 * X-Powered-By: Express
 * Content-Type: application/json; charset=utf-8
 * Content-Length: 124
 * ETag: W/"7c-AgLL4ZiDSiAfTng6MBes/hK2ZLA"
 * Date: Mon, 28 Oct 2024 02:33:23 GMT
 * Connection: keep-alive
 * Keep-Alive: timeout=5
 *
 * [{"id":1,"title":"foo","completed":false},{"id":2,"title":"bar","completed":true},{"id":3,"title":"test","completed":false}]%
 */

/**
 * NOTE: Todos.jsの40行目：useState()あたり。todosがundefinedになるのでtodos.map()でエラーになる。
 * NOTE: しかし、Nodejsをメインにしているため、React/Next.jsで止まってしまうのは良くない。
 * NOTE: そこで、一旦これはサスペンドする。
 *
 * TODO: from here
 * curl -i 'http://localhost:3000'
 * でエラーになる。
 * 以下のコードの手前から動くか試し中。
 * APIは動作する。
 * curl -i 'http://localhost:3000/api/todos'
 * ページは、以下のコードがないと404 NOT FOUNDになる。
 * curl -i 'http://localhost:3000'
 *
 */
/*
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({dev})

// TODO: 警告解決
nextApp.prepare().then(
    () => app.get('*', nextApp.getRequestHandler()),
    err => {
        console.error(err)
        process.exit(1)
    })
*/
