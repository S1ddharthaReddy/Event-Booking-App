
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const bookingRoutes = require("./routes/booking");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/booking", bookingRoutes);

// Connection to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log(`Connected to MongoDB`);
})
.catch((error)=>{
    console.error(`Error connecting to MongoDb`, error);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`);
})
