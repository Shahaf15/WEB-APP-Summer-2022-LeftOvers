const express = require('express')
const app = express()
const port = 8080

express.static('..', [])

app.get('/', (req, res, next) => {
console.log("here are req params" + req.params);
next()
})


app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
})


const Connection = require('tedious').Connection
const Request = require('tedious').Request

const config = {
  server: 'SHAHAF',
  authentication: {
    type: 'default',
    options: {
      userName: '', // update me
      password: '' // update me
    }
  }
}

const connection = new Connection(config)

connection.on('connect', (err) => {
  if (err) {
    console.log(err)
  } else {
    executeStatement()
  }
})

function executeStatement () {
  request = new Request("select 123, 'hello world'", (err, rowCount) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`${rowCount} rows`)
    }
    connection.close()
  })

  request.on('row', (columns) => {
    columns.forEach((column) => {
      if (column.value === null) {
        console.log('NULL')
      } else {
        console.log(column.value)
      }
    })
  })

  connection.execSql(request)
}