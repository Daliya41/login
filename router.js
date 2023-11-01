var express=require('express');
var router=express.Router();

const credential={
    email:"admin1@gmail.com",
    password:"123"
}


router.get("/", (req, res) => {
    if (req.session.logged) {
      res.redirect("/home");
    } else {
res.render("base", { local: { title: "Login System" } });
    }
  });
  
  
//log user
router.post("/login", (req, res) => {
  if (
    req.body.email == credential.email &&
    req.body.password == credential.password
  ) {
    req.session.user = req.body.email;
    req.session.pass = req.body.password
    req.session.logged = true;
    res.redirect("/home");
  }else  {
    res.render('base', { local: { title: 'Login System' }, err: "Invalid Username or Password" });
  } 
});

//to home page
router.get('/home', (req, res) => {
  if(req.session.logged){
  if (req.session.user) {
      res.render('home', { local: { title: 'HomePage' }, user: req.session.user });
  }
else{
  res.redirect('/')
}}
});

//for signout
router.get('/signout', (req, res) => {
    req.session.destroy();
    res.redirect("/");
  });
  
module.exports=router;