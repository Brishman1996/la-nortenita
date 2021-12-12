const MongoClient = require('mongodb').MongoClient
const uri= "mongodb+srv://brishman:canoleonbrishman1996@clustercertus.eoin3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

let client;

module.exports = function(){
    if(!client){
        try{
        client = new MongoClient(uri, {userNewUrlParser:true, useUnifiedTopology:true});
        } catch(e){
            console.log("error al conectarse a la BD", e)
        }    
    }

    return client;
}
