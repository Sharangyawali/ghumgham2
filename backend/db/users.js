const mongoose=require('mongoose')
mongoose.set('strictQuery', false)
const userSch=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number,
    isUserVerified:{type:Boolean,default:false},
    auth:{type:String,default:""}

})

module.exports=mongoose.model('users',userSch)