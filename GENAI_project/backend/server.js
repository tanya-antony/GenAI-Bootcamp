const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { handleUnifiedChat,handleLawBotChat } = require('./Services/aiService');

const app = express();

const PORT = process.env.PORT 

app.use(cors());
app.use(express.json());

app.post('/api/chat',handleUnifiedChat)
app.post('/api/lawbot',handleLawBotChat)

app.listen(PORT, ()=>{
    console.log(`Server is running on Port:${PORT}`);
});