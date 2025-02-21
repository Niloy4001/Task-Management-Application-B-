require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const tasksCollection = client
      .db("TaskManagerApplication")
      .collection("tasksCollection");
    // const haiku = database;

    app.get("/", (req, res) => {
      res.send("hlw");
    });

    app.post("/tasks", async (req, res) => {
      const task = req.body;
      const result = await tasksCollection.insertOne(task);
      res.send(result);
    });
    app.get("/tasks", async (req, res) => {
      // const task = req.body;
      const result = await tasksCollection.find().toArray();
      // console.log(result);

      res.send(result);
    });

    app.delete("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const result = await tasksCollection.deleteOne(query);
      res.send(result);
    });

    app.patch("/tasks/:id", async (req, res) => {
      const { id } = req.params;
      const { modalTitle, modalDescription } = req.body;
      const filter = { _id: new ObjectId(id) };
      console.log(modalTitle, modalDescription, id);

      const updateDoc = {
        $set: {
          title: modalTitle,
          description: modalDescription,
        },
      };
      const result = await tasksCollection.updateOne(filter, updateDoc);
      res.send(result);

      // const result = await tasksCollection.updateOne(
      //   { _id: new ObjectId(id) },
      //   { $set: { title, description, category } }
      // );
    });

    app.patch("/transfer/:id", async(req,res)=>{
      const id = req.params.id;
      const {whereToDrop} = req.body;

      const filter = {_id: new ObjectId(id)}
      if (whereToDrop) {
        const updateDoc = {
          $set:{
            category: whereToDrop,
          }
        }  
        const result = await tasksCollection.updateOne(filter,updateDoc);
        res.send(result)
      }
      

      console.log(id);
      console.log(whereToDrop);
      
    })
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);

app.listen(port, () => {
  console.log(`our server is running on port ${port}`);
});



