const express = require("express")
const path = require("path")
const app = express()

app.use(express.static("views/"))
app.get('/', (req, res) => res.sendFile(path.join(__dirname, "views/", "main.html")));

app.listen(3000, () => console.log('Example app listening on port 3000!'))