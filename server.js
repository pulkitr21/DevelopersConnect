const express=require('express');
const mongoose=require('mongoose')
const bodyParser=require('body-parser');
const passport=require('passport');
const app=express();

//body parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


const users=require('./routes/api/users')
const profile=require('./routes/api/profile')
const posts=require('./routes/api/posts')

//DB config
const db=require('./config/keys').mongoURI;

//Connect to mongoDB

mongoose
    .connect(db)
    .then(()=>{console.log('MongoDB connected')})
    .catch((err)=>console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config

require('./config/passport')(passport);

app.use()
app.get('/',(req,res)=>{
    res.send('<h1>Voillaaaaaaaaaa</h1>')
})




//Use routes

app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);


const port=process.env.PORT|| 9889;
app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`)
})