import * as fs from 'fs';
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
let configUrl: string | undefined = process.env.LIFETRACKER_JSON_URL;
let configPath: string = process.env.LIFETRACKER_JSON_PATH || "../lifesheet.json";

if (configUrl && isValidUrl(configUrl)) {
  console.log("Loading remote JSON config...");
  needle.get(configUrl, function(error, response, body) {
    userConfig = body;
    console.log("Successfully loaded remote user config");
  });
} else {
  console.log(`Loading local user config at ${configPath}...`);
  userConfig = JSON.parse(fs.readFileSync(configPath).toString());
  console.log("Successfully loaded user config");
}

export { Command, QuestionToAsk, userConfig };
