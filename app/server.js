//import express and cors
const express = require("express");
const cors = require("cors");

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);


//create express app 
const app = express();

const corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


//parse request of content-type - application/ json 
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded

app.use(express.urlencoded({extended: true}));
//

const db =require("./models");
const Role = db.role;

db.mongoose.connect(`mongodb://${dbconfig.HOST}:${db.config.PORT}/${dbconfig.DB}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Successfully connected to MongoDB.");
    initial();
}).catch(err =>{
    console.log("Connection error", err);
    process.exit();
})


function initial(){
    Role.estimatedDocumentCount((err,count) =>{

        if(!err & count ===0){
            new Role({
                name: "user"
            }).save(err=> {
                if(err){
                    console.log("error", err);
                }
                console.log("Added user to the Roles collection");
            });

            new Role({
                name: "moderator"
              }).save(err => {
                if (err) {
                  console.log("error", err);
                }
        
                console.log("added 'moderator' to roles collection");
              });

              new Role({
                name: "admin"
              }).save(err => {
                if (err) {
                  console.log("error", err);
                }
        
                console.log("added 'admin' to roles collection");
              });
            
        }
    });
}
//simple route

app.get("/", (req, res)=>{

    res.json({message: "Welcome to Keanu Application"});
});

//set port, listen for request

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`tHE SERVER IS RUNNING ON PORT ${PORT}`);
});