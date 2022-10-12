const express = require('express')
const app = express()
const port = 8080

app.get('/users/:userId/books/:bookId'
    , function (req, res) {
        res.send(req.params)
    })
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
