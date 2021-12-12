const mongoose = require('mongoose');
const uri = "mongodb+srv://brishman:canoleonbrishman1996@clustercertus.eoin3.mongodb.net/restaurante?retryWrites=true&w=majority"; 

let shema;

module.exports = function(){
    if(!shema){
        try{
            shema = mongoose.connect(uri, {
                userNewUrlParser:true,
                useUnifiedTopology:true
            },()=> 
                console.log('Se conecto mongoose a la base de datos correctamente'));
        } catch(error){
            console.log('No se conecto a la base de datos')
        }
    }
    return shema;
}