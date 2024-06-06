import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ success: true });
});


app.listen(5050,()=>{
    console.log("Server Is Running on PORT 5050");
    
})