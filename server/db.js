import mongoose from 'mongoose';
const connection=()=>{
    const connectionParams={
        useNewUrlParser:true,
        useUnifiedTopology:true
    };
    try{
        mongoose.connect(process.env.DB);
        console.log("database connected succesfully");
    }
    catch(err)
    {
        console.log(err);
        console.log("could not connect to database");
    }

}
export default connection;
