const prompts = require('../data/prompts.json');

function getUnifiedPrompt(userMessage){
    return prompts.unifiedChat.systemPrompt + "\n\nUser: " + userMessage;
}

function getLawBotPrompt(userMessage) {
    return prompts.lawBot.systemPrompt + "\n\nUser: " + userMessage;
}

module.exports = { getUnifiedPrompt,getLawBotPrompt };