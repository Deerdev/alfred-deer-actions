import { outputOk, constructDeepLinkMsg } from '../utils.js'

// open notion todo page
const notionTodoPageUrl = "notion://www.notion.so/Daily-Doing-f3c9fb695c5e4126820ca5beec09cfa0"

outputOk(constructDeepLinkMsg(notionTodoPageUrl));
