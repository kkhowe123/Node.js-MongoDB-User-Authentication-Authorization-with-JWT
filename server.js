//import express and cors
const express = require("express");
const cors = require("cors");
const dbconfig =  {
    HOST: "0.0.0.0",
    PORT: 27017,
    DB: "bezkoder_db"
  };



//create express app 
const app = express();
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


//parse request of content-type - application/ json 
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded

app.use(express.urlencoded({extended: true}));
//

const db =require("./app/models");
const Role = db.role;

db.mongoose.connect(`mongodb+srv://keanuhowe3:keanuhowe@cluster0.ijllzlv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,{
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
  Role.estimatedDocumentCount()
  .then(count => {
    if (count === 0) {
      // Logic to initialize roles

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
  })
  .catch(err => {
    console.error("Error estimating document count:", err);
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