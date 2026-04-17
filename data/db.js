const mysql=require("mysql2")

const credentials={
    host:"localhost",
    user:"root",
    password:"password",
    database:"blog"
}

const connection = mysql.createConnection(credentials)

connection.connect((err)=>{
    if(err) throw err;
    console.log("Connected to MySQL!")
})

module.exports = connection