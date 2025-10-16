const prompts = require('../data/prompts.json');

function getUnifiedPrompt(userMessage){
    return prompts.unifiedChat.systemPrompt + "\n\nUser: " + userMessage;
}

function getLawBotPrompt(userMessage) {
    return prompts.lawBot.systemPrompt + "\n\nUser: " + userMessage;
}

function getTalk2GovPrompt(userMessage) {
    return `${prompts.talk2Gov.systemPrompt}\n\nUser: ${userMessage}`;
}

function getLocalLanguagePrompt(userMessage) {
    return `${prompts.localLanguageAssistant.systemPrompt}\n\nUser: ${userMessage}`;
}

module.exports = { getUnifiedPrompt,getLawBotPrompt,getTalk2GovPrompt,getLocalLanguagePrompt };