const express = require('express')
const app = express()
const port = 3000
const postsRouter=require("./routers/posts")
const serverError=require("./middlewares/serverError")
const notFound=require("./middlewares/notFound")

app.use(express.json())

app.use(express.static("public"))

app.use("/posts",postsRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(serverError)
app.use(notFound)