import needle from 'needle';

// Interfaces
interface Command {
  description: string;
  schedule: string;
  questions: [QuestionToAsk];
}

interface QuestionToAsk {
  key: string;
  question: string;
  type: string;
  buttons: { [key: string]: string };
  replies: { [key: string]: string };
}

let userConfig: { [key: string]: Command };
let url: string | undefined = process.env.LIFESHEET_JSON_URL;
if (url) {
  console.log("Loading remote JSON config...");
  needle.get(url, function(error, response, body) {
    userConfig = body;
    console.log("Successfully loaded remote user config");
    module.exports.userConfig = userConfig;
  });
} else {
  userConfig = require("../lifesheet.json");
  console.log("Successfully loaded user config");
  module.exports.userConfig = userConfig;
}

export { Command, QuestionToAsk, userConfig };
