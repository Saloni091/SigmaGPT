import cors from "cors";
import dns from "dns";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
// const PORT = 8080;
const PORT = process.env.PORT || 8080;

dns.setServers(["8.8.8.8"]); // Set Google's DNS server

// app.use(cors());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

app.use("/api", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
    });
 
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected with Database!");
    } catch(err){
console.log("Failed to connect with Db",err);
    }
}





// calling openai api (utility based task)

    app.post("/test",async (req, res) => {
        const options = {
        method: "POST", 
        headers:{"Content-Type": "application/json",   
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` 
        },
        body: JSON.stringify({
            model:"gpt-4o-mini",
            messages: [{
                "role": "user",
                "content": req.body.message
            }]
        })
    };
        try {
            const response = await  fetch("https://api.openai.com/v1/chat/completions", options);
            const data = await response.json();
            console.log(data.choices[0].message.content); // reply from OpenAI
            res.send(data.choices[0].message.content);
    } catch (err) {
        console.log(err);
    }
});









