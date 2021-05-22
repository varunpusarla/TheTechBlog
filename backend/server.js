import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from 'dotenv'
const app = express();
import Posts from './postModel.js'



const port = process.env.PORT || 9000;
const connection_url = 'mongodb+srv://varunpusarla:pusarla123@cluster0.ezx9y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.use(express.json())
app.use(cors())



mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.once('open', () => {
    console.log("DB Connected")
})


app.get('/posts/:_id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params._id)
        res.json(post)
    } catch (err) {
        res.send('Error ' + err)
    }
})


app.get('/posts/', (req, res) => {
    Posts.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
})

app.post('/posts/new', (req, res) => {
    const newPost = req.body

    Posts.create(newPost, (err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })

})


app.listen(port, () => console.log(`listening on ${port}`))

//create a database on mongdb atlas
//create post model schema