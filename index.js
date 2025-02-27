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
    
     
      const lastTask = await tasksCollection.find().sort({ order: -1 }).limit(1).toArray();
      const lastOrder = lastTask.length > 0 ? lastTask[0].order : 0;
    
     
      task.order = lastOrder + 1;
    
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

    app.patch("/reorder", async (req, res) => {
      const { draggedId, draggedOrder, droppedId, droppedOrder } = req.body;

      // set dragged item order to dropped item order
      const draggedFilter = { _id: new ObjectId(draggedId) };
      const draggedUpdatedDoc = {
        $set: { order: droppedOrder },
      };
      const result1 = await tasksCollection.updateOne(
        draggedFilter,
        draggedUpdatedDoc
      );

      // set dropped item order to dragged item order
      const droppedFilter = { _id: new ObjectId(droppedId) };
      const droppedUpdatedDoc = {
        $set: { order: draggedOrder },
      };
      const result2 = await tasksCollection.updateOne(
        droppedFilter,
        droppedUpdatedDoc
      );

      // console.log(draggedId, draggedOrder, droppedId, droppedOrder);
      res.send({ result1, result2 });
    });



    app.patch("/changeCategory", async (req, res) => {
      const { draggedId, droppedCategory } = req.body;

      // set dragged item order to dropped item order
      const draggedFilter = { _id: new ObjectId(draggedId) };
      const draggedUpdatedDoc = {
        $set: { category: droppedCategory },
      };
      const result = await tasksCollection.updateOne(
        draggedFilter,
        draggedUpdatedDoc
      );

      
      // console.log(draggedId, draggedOrder, droppedId, droppedOrder);
      res.send(result);
    });
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
