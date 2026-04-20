import express from "express"
//require('dotenv').config()
import dotenv from "dotenv"
import cors from "cors"
dotenv.config({path:"./.env"})
const app=express();
app.use(cors());
app.use(express.json());
let port=process.env.PORT;
app.get('/',(req,res)=>{
    res.send("welcome to the home page")

})
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemma:2b",
        prompt: userMessage,
        stream: false,
      }),
    });

    const data = await response.json();

    res.json({ reply: data.response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "AI error" });
  }})


app.listen(port,(req,res)=>{
        console.log(`sever is running ${port}`);
})
