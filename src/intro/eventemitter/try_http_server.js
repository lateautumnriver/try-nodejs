/**
 * Trying running a http server as an EventEmitter
 */
const http = require('http');

function createHttpServer() {
    // Creation of a http server as an EventEmitter
    const http_server = http.createServer()

    // Registration of an event listener for start of listening to a request
    http_server.on('listening', () => {
        console.log('http server listening on port', http_server.address().port);
    })

    // Registration of an event listener for end of listening to a request
    http_server.on('close', () => {
        console.log('http server closed on port', http_server.address().port);
    })

    // Registration of an event listener for a request
    http_server.on('request', (req, res) => {
        console.log('received a request', req.url);
        if (req.url.startsWith('/close')) {
            // FIXME: Uncaught TypeError: Cannot read properties of null (reading 'port')
            // EventEmitterを知るためのコードなので、本質的ではないかもしれない。なので一旦解決しないでおく。
            console.log('x1')
            res.end()
            console.log('x2')
            http_server.close()
            console.log('x3')
            return
        }
        if (req.url.startsWith('/error')) {
            //
            // FIXME: Make an error occur.
            // EventEmitterを知るためのコードなので、本質的ではないかもしれない。なので一旦解決しないでおく。
            //
            // http_server.error(req, res);
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.write('Error emulated!');
            res.end();
            return
        }
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('Hello World!');
        res.end();
    })

    // Registration of an event listener for occurring an error event
    http_server.on('error', (err) => {
        console.log('http server error:', err);
    })

    http_server.listen(8080);
    return http_server
}

module.exports.createHttpServer = () => createHttpServer()

/**
 const t = require('./src/intro/eventemitter/try_http_server')
 let s = t.createHttpServer()
 // $ curl -i 'http://localhost:8080/'
 // $ curl -i 'http://localhost:8080/error'
 // $ curl -i 'http://localhost:8080/close'
 */
