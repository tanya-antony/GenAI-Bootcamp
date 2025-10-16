const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { handleUnifiedChat,handleLawBotChat,handleLocalLanguageChat,handleTalk2GovChat } = require('./Services/aiService');

const app = express();

const PORT = process.env.PORT || 8080

app.use(cors());
app.use(express.json());

app.post('/api/chat',handleUnifiedChat)
app.post('/api/lawbot',handleLawBotChat)
app.post('/api/talk2gov', handleTalk2GovChat);
app.post('/api/translate', handleLocalLanguageChat);

app.listen(PORT, ()=>{
    console.log(`Server is running on Port:${PORT}`);
});