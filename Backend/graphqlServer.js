const express = require('express');
const path = require('path')
const app = express();
const PORT = 6969;
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./Schemas');
const mongoose = require('mongoose');
const {SimpleGA, Request} = require('node-simple-ga')
const isTokenValid = require('./Authenication/validate');
let database = null;

let GOOGLE_PAGEPATHS = {};


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


app.use('/trending', (req, res)=>{
    (async function() {
        var analytics = new SimpleGA(path.join(__dirname, "./key.json"));
    
        var requestPopularProducts = Request()
            .select("pagepath","pageviews")
            .from(process.env.GA_VIEW_ID)
            .where("pagepath")
            .beginsWith('/product')
            .orderDesc("pageviews")
            .limit(20);
    
    
        try {
    
            var r1 = analytics.run(requestPopularProducts);

            var [requestPopularProducts] = await Promise.all([
                r1
            ]);
    
            console.log(requestPopularProducts);
            
            const slugs = [];
            requestPopularProducts.forEach(element => {
                let slug= element.pagePath.slice(9);
                if(slug != null){
                    slugs.push({slug,pageviews: element.pageviews })
                }    
            });

            console.log(slugs);
            res.send(slugs);
            GOOGLE_PAGEPATHS = slugs;
        } catch (err) {
            console.error(err);
        }
    })();
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})