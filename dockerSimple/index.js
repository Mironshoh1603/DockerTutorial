const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Salom Dunyo!. Bu DockerSimple dasturi'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))