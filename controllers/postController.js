const posts = require("../data/postsData")
const connection = require("../data/db")

const index = (req, res) => {

    const sql = "SELECT * FROM posts"

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({
            error: "Database query failed"
        })
        res.json(results)
    })

}

const show = (req, res) => {

    const { id } = req.params

    const postSql = `
    SELECT posts.* 
    FROM posts 
    WHERE id=?
    `
    const tagSql = `
        SELECT tags.*
        FROM tags
        JOIN post_tag ON tags.id= post_tag.tag_id
        WHERE post_tag.post_id = ?
        `
    connection.query(postSql, [id], (err, postResults) => {
        if (err) return res.status(500).json({
            error: "Database query failed"
        })

        if (postResults.length === 0) return res.status(404).json({
            error: true,
            message: "Posts not found"
        })
        const post=postResults[0]
        connection.query(tagSql, [id], (err, tagResult) => {

            if (err) return res.status(500).json({
                error: "Database query failed"
            })

            post.tags = tagResult
            console.log(post.tags);
            res.json(post)
        })
    })
}

const store = (req, res) => {
    const newId = posts[posts.length - 1].id + 1
    const { title, content, image, tags } = req.body

    const newPost = {
        id: newId,
        title,
        content,
        image,
        tags
    }

    posts.push(newPost)
    console.log(posts);

    res.status(201).json(newPost)

}

const update = (req, res) => {
    const id = parseInt(req.params.id)

    const post = posts.find(post => post.id === id)

    if (!post) {
        res.status(404)
        return res.json({ error: "Not found", message: "Post non trovato" })
    }

    const { title, content, image, tags } = req.body

    post.title = title
    post.content = content
    post.image = image
    post.tags = tags

    res.json(posts)

}

const modify = (req, res) => {
    res.send(`Update post with id ${req.params.id}`)
}

const destroy = (req, res) => {

    const { id } = req.params

    const sql = "DELETE FROM posts WHERE id=?"

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({
            error: "Failed to delete post"
        })

        if (results.affectedRows === 0) {
            return res.status(404).json({
                error: true,
                message: "Not Found, nothing to delete"
            })
        }
        res.sendStatus(204)
    })
}

module.exports = { index, show, store, update, modify, destroy }