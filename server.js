// server.js
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost/spotifyCounter", {
  useUnifiedTopology: true,
});

const counterSchema = new mongoose.Schema({
  count: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

app.post("/increment", async (req, res) => {
  try {
    let counter = await Counter.findOne();
    if (!counter) {
      counter = new Counter();
    }
    counter.count += 1;
    await counter.save();
    res.json({ count: counter.count });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/count", async (req, res) => {
  try {
    const counter = await Counter.findOne();
    res.json({ count: counter ? counter.count : 0 });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
