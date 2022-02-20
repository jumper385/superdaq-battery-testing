const express = require('express');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

let startTime = 0;
let lastPostTime = 0;
let voltage = 0;

app.get("/", (req,res) => {
    res.json({
        elapsedTime: (lastPostTime - startTime)/1000/60,
        voltage: (voltage/4096)*2*3.3
    })
})

app.post("/", (req,res) => {
    console.log(req.body);
    voltage = req.body.voltage;
    lastPostTime = new Date();
    elapsedTime = lastPostTime - startTime;
    res.json({elapsed: elapsedTime});
})

app.post("/start", (req,res) => {
    delta = req.body.delta * 1000; // delta in seconds
    startTime = Math.abs(new Date() - delta);
    res.json({startTime:new Date(startTime)})
})

app.listen(3000, () => console.log('listening on 3000...'));