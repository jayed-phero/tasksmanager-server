const express = require("express");
const cors = require("cors")
require("dotenv").config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.msatzvk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try {
        const tasksCollection = client.db("TasksManager").collection("tasksContainer")
        const tasksDetilsCollection = client.db("TasksManager").collection("tasksDetailsContainer")

        app.get('/postedtasks', async (req, res) => {
            const result = await tasksCollection.find().toArray()
            res.send(result)
        })

        app.post('/tasks', async (req, res) => {
            const tasksData = req.body
            const result = await tasksCollection.insertOne(tasksData);
            res.send(result)
        })

        app.get('/complete/')

        app.post('/tasksdetails', async (req, res) => {
            const tasksData = req.body
            const result = await tasksDetilsCollection.insertOne(tasksData);
            res.send(result)
        })

        app.get('/tasksinfo/:taskId', async (req, res) => {
            const id = req.params.taskId
            const query = { taskId: id }
            const result = await tasksDetilsCollection.find(query).toArray()
            res.send(result)
        })

        app.put('/updatetask/:id', async (req, res) => {
            const id = req.params.id
            const task = req.body
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true }
            const updateDoc = {
                $set: task,
            }
            const result = await tasksCollection.updateOne(filter, updateDoc, options)
            console.log(result)

            res.send(result)
        })

        // complted
        app.put('/completetask/:id', async (req, res) => {
            const id = req.params.id
            const task = req.body
            const filter = { _id: ObjectId(id)  }
            const options = { upsert: true }
            const updateDoc = {
                $set: task,
            }
            const result = await tasksCollection.updateOne(filter, updateDoc, options)
            console.log(result)

            res.send(result)
        })

        //un complted
        app.put('/uncompletetask/:id', async (req, res) => {
            const id = req.params.id
            const task = req.body
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true }
            const updateDoc = {
                $set: task,
            }
            const result = await tasksCollection.updateOne(filter, updateDoc, options)
            console.log(result)

            res.send(result)
        })

        // task delete
        app.delete('/alltask/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await tasksCollection.deleteOne(filter)
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


