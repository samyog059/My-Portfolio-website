const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Mongo error:", err));

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
}, { timestamps: true });

const Contact =
  mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema);

app.post("/api/contact", async (req, res) => {
  try {
    console.log(req.body); // DEBUG LINE
    const contact = new Contact(req.body);
    await contact.save();
    res.json({ success: true, message: "Message saved" });
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
