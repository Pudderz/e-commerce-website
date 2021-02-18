const express = require('express');
const app = express();
const PORT = 6969;
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./Schemas');
const mongoose = require('mongoose');
const isTokenValid = require('./Authenication/validate');
let database = null;

require("dotenv").config();
const uri = `mongodb+srv://dbAdmin:${process.env.MONGODB_PASSWORD}@cluster0.s5qsx.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`;
    console.log(uri)
    
const startDatabase =()=>{
    
         mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log('db connection is okay');

            if (!database) {
            console.log('no database set')
            }
        }
    }) 
    
}


const context = async (req) => {
    const db = await startDatabase();
    const token = req.headers.authorization;
    
    return { db, token };
  };



 
  


app.use(cors());
app.use(express.json());
app.use('/graphql', graphqlHTTP(async req=>({
    schema,
    graphiql: true,
    context: () => context(req)
})))


app.listen(PORT, () => {
    console.log('Server running')
})