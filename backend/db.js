const moongoose = require('mongoose')
const mongoURI = "mongodb+srv://ukgprojects:bbdv0vb8tVhCfiQE@cluster0.shsxoh2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectToMongo = ()=>{
    moongoose.connect(mongoURI).then(() => {
        console.log("Connected to Database successfully");
    })
    .catch((err) => {
        console.log(err);
    })
    

}
module.exports = connectToMongo;