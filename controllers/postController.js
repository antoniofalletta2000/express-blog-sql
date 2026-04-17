const posts = require("../data/postsData")
const connection = require("../data/db")

const index= (req, res) => {
    
    const sql = "SELECT * FROM posts"

    connection.query(sql,(err, results)=>{
        if(err) return res.status(500).json({
            error:"Database query failed"
        })
        res.json(results)
    })
    
}

const show=(req,res)=>{
    const post= posts.find(post=>post.id===parseInt(req.params.id))
    if(post){
        res.json(post)
    }else{
        res.status(404).json({message:"Post not found"})
    }
}

const store=(req,res)=>{
    const newId=posts[posts.length - 1].id + 1
    const {title, content, image, tags}= req.body

    const newPost={
        id:newId,
        title,
        content,
        image,
        tags
    }

    posts.push(newPost)
    console.log(posts);

    res.status(201).json(newPost)
    
}

const update=(req,res)=>{
    const id= parseInt(req.params.id)

    const post=posts.find(post=>post.id===id)

    if(!post){
        res.status(404)
        return res.json({error:"Not found", message:"Post non trovato"})
    }

    const {title, content, image, tags}=req.body

    post.title=title
    post.content=content
    post.image=image
    post.tags=tags

    res.json(posts)

}

const modify=(req,res)=>{
    res.send(`Update post with id ${req.params.id}`)
}

const destroy=(req,res)=>{
    
    const index= posts.findIndex(post=>post.id===parseInt(req.params.id))
    if(index !=-1 ){
        const postDeleted=posts.splice(index,1)
        res.json(postDeleted)
    }else{
        res.status(404).json({message:"Nessun contenuto"})
    }
}

module.exports={index, show, store, update, modify, destroy}