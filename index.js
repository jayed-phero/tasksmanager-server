const express = require("express");
const cors = require("cors")
require("dotenv").config()
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.msatzvk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try {
        const tasksCollection = client.db("TasksManager").collection("tasksContainer")

        app.post('/tasks', async (req,res) => {
            const tasksData = req.body 
            const result = await tasksCollection.insertOne(tasksData);
            res.send(result)
        })
    } catch (error) {
        console.log(error)
    }
}

run()

app.get('/', (req, res) => {
    res.send("TasksManager is running")
})

app.listen(port, () => {
    console.log(`TasksManager is Running on ${port}`)
})


