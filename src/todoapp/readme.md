# todo-app

# Run

```shell
npm start
```

To request to the server by using REPL, run `node` then do the follows:

```javascript
// Success and normal case
await fetch('http://localhost:3000/api/todos')
console.log(_.status, await _.json())

// With query parameter case
await fetch('http://localhost:3000/api/todos?completed=true')
console.log(_.status, await _.json())

// Error case
await fetch('http://localhost:3000/api/no-such-api')
console.log(_.status, await _.text())
```


# TODO:

```shell
npm start
TypeError: Cannot read properties of undefined (reading 'map')
    at Todos (webpack-internal:///./components/Todos.js:90:33)
```