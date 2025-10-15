const prompts = require('../data/prompts.json');

function getUnifiedPrompt(userMessage){
    return prompts.unifiedChat.systemPrompt + "\n\nUser: " + userMessage;
}

module.exports = { getUnifiedPrompt };