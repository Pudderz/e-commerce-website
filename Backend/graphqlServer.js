const express = require('express');
const app = express();
const PORT = 6969;
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./Schemas');




app.use(cors());
app.use(express.json());
app.use('/graphql', graphqlHTTP({
    schema,
    // rootValue: resolvers,
    graphiql: true,
}))


app.listen(PORT, () => {
    console.log('Server running')
})