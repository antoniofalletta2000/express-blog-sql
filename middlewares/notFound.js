function notFound(req, res, next){
    res.status(404).json({
        error:"Not found",
        message:"post non trovato"
    })
}

module.exports=notFound