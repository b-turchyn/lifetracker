import needle from 'needle';
import { URL } from 'url';

const isValidUrl = (s) => {
    try {
      new URL(s);
      return true;
    } catch (err) {
      return false;
    }
  };

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
  if (isValidUrl(url)) {
    console.log("Loading remote JSON config...");
    needle.get(url, function(error, response, body) {
      userConfig = body;
      console.log("Successfully loaded remote user config");
    });
  } else {
    console.log(`Loading local user config at ${url}...`);
    userConfig = require(url);
    console.log("Successfully loaded remote user config");
  }
} else {
  userConfig = require("../lifesheet.json");
  console.log("Successfully loaded user config");
}

export { Command, QuestionToAsk, userConfig };
