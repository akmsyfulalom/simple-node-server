const express = require('express')
const app = express();
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const port = process.env.PORT || 5000



app.get('/', (req, res) => {
    res.send('simple node server is running');
});
app.use(cors())
app.use(express.json())

const users = [
    { id: 1, name: 'Sabana', email: 'sabana@gmail.com' },
    { id: 2, name: 'sabina', email: 'sabina@gmail.com' },
    { id: 3, name: 'rubina', email: 'rubina@gmail.com' },
    { id: 4, name: 'ayana', email: 'ayana@gmail.com' }
]


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qoygz5c.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        const userCollection = client.db('simpelNode').collection('users')

        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray()
            res.send(users)
        })


        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user)
            user.id = result.insertedId
            res.send(user)
        })


    }
    finally {

    }

}
run().catch(err => console.log(err));


app.get('/users', (req, res) => {
    if (req.query.name) {
        const search = req.query.name;
        const fillted = users.filter(usr => usr.name.toLowerCase().indexOf(search))
        res.send(fillted)
    } else {
        res.send(users)
    }

})

// app.post('/users', (req, res) => {
//     console.log('user posted ')
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user)
//     console.log(user);
//     res.send(user)
// })

app.listen(port, () => {
    console.log(`simple mode server id Running ${port}`);
})
