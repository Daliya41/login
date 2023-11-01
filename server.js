const express=require('express');
const path=require('path');
const app=express();
const {v4:uuidv4}=require('uuid');
const session=require('express-session')
const router=require('./router')
const nocache=require('nocache')

const port =process.env.port ||3031;


app.set('view engine','ejs')

app.use(express.urlencoded({extended :true}))

//linkf css file
app.use('/static',express.static(path.join(__dirname,'global')))

app.use(nocache());

app.use(session({
   secret:"uuidv4",
   resave:false,
   saveUninitialized: true,
}))


app.use('/',router)


 app.get('/',(req,res)=>{
    res.render('base',{local:{title:"Login System"}})
 })
 

 app.listen(port,()=>{
      console.log("listening to the server on http://localhost:3031")
   })