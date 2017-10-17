import express from 'express'
import proxy from 'http-proxy-middleware'

const PORT = process.env.PORT || 3000
const MIDDLEWARE_ENDPOINT = process.env.MIDDLEWARE_ENDPOINT || 'http://middleware/'

let web = express()

// Load Angular
web.use(express.static('dist'))

// Proxy APIs to Middleware server
web.use('/api*', proxy({
  target: MIDDLEWARE_ENDPOINT
}))

// Assume everything else is an angular path
web.get('*', function(req, res) {
  let indexHtml = process.env.NODE_ENV == 'production'
                  ? 'index.html'
                  : __dirname + '/dist/index.html'
  res.sendfile(indexHtml)
})

// Listen
web.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`)
})
