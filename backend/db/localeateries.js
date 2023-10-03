const mongoose=require('mongoose')
const placesch=new mongoose.Schema({
category:String,
name:String,
review:Number,
price:String,
maxprice:String,
location:String,
description:String,
latitude:Number,
longitude:Number,
avatar:String,
num_reviews:Number,
isVerified:{
    type:Boolean,
    default:false,
}
})

const placemodel=mongoose.model('places',placesch)

module.exports=placemodel