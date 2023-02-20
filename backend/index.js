const express=require('express')
const cors=require('cors')
require('./db/connectdb')
const placemodel=require('./db/localeateries')
const users=require('./db/users')
const sendverifymail=require('./mail/mail')
const multer=require('multer')
const app=express()
const jwt=require('jsonwebtoken');
const sendresetmail = require('./mail/mail2');
const jwtKey='KTBHJK'
app.use(cors())
app.use(express.json())
app.use('/images',express.static('./images'))
const port=process.env.PORT||5000

 const fileStorageEngine=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./images')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname)
    },
 })
const upload=multer({storage:fileStorageEngine})


app.post('/addplace',upload.single('avatar'),(req,res)=>{
    let data=new placemodel({
        category:req.body.category,
        name:req.body.name,
        review:req.body.review,
        price:req.body.price,
        maxprice:req.body.maxprice,
        location:req.body.location,
        description:req.body.description,
        latitude:req.body.latitude,
        longitude:req.body.longitude,
        avatar:req.file.path,
        num_reviews:req.body.num_reviews,
        isVerified:req.body.isVerified
    })
    data.save()
    .then(result=>{
        res.send("succesfully added")
    })
    .catch(error=>{
        console.log(error)
    })
})


app.get('/place',async(req,res)=>{
    let data=await placemodel.find()
    if(data){(res.send(data))}

})


app.post("/register",async(req,res)=>{
    let  repeat=await users.findOne({"email":req.body.email})
    if(repeat) return res.status(400).json({success:false,error:"This email is already exists"})
   else{ const data=new users(req.body)
    let result=await data.save()
    result=result.toObject()
    delete result.password
    res.send(result)
    sendverifymail(result.name,result.email,result._id)
}})


app.put('/verify',async(req,res)=>{
    try {
        
        let updateinfo=  await users.updateOne({_id:req.query.id},{$set:{isUserVerified:true}})
      res.send(updateinfo)
      } catch (error) {
        return res.status(400)
        .json({success:false,error:"Error in verification"})
      }
})


app.post("/login",async(req,res)=>{
    if(req.body.password&&req.body.email){
   let data=await users.findOne(req.body).select("-password")
    if(data&&data.isUserVerified===false)return res.status(400)
         .json({success:false,error:"Please verify your email first!"})
    if(data && data.isUserVerified===true){
        res.send(data)
    }
    else{
        res.send({result:"no user found"})
    }
}
else{
    res.send({result:"no user found"})
}
})


app.post('/forgetpassword',async(req,res)=>{
    if(req.body.email){
        let data=await users.findOne(req.body)
        if(data){
            jwt.sign({data},jwtKey,{expiresIn:"2h"},async (err,token)=>{
                if(err){res.send({result:"something went wrong"})}
                let result= await users.updateOne({email:req.body.email},{$set:{"auth":token}})
                res.send({result}) 
                sendresetmail(data.name,data.email,data._id,token)
            })
        }
        else{
            return res.status(400)
         .json({success:false,error:"You do not have an account with this email"})
        }
    }
    })
    
    app.put('/resetpassword',async(req,res)=>{
        if(req.body.password){
        let result=await users.findOne({auth:req.query.token})
        if(result){
        try {
            let data=  await users.updateOne({_id:req.query.id},{$set:{"password":req.body.password}})
          res.send(data)
          } catch (error) {
            return res.status(400)
            .json({success:false,error:"Error in verification"})
          }
        }
        else{
            return res.status(400)
            .json({success:false,error:"Error in verification"})
        }
    }
    })

app.listen(port)