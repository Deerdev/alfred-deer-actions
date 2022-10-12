import minimist from 'minimist'
import { outputOk, outputErr, constructTextMsg } from '../utils.js'
import { Client } from '@notionhq/client'

// https://www.notion.so/my-integrations
// https://developers.notion.com/docs/getting-started

const notion = new Client({
  auth: process.env.NOTION_KEY 
})

const databaseId = process.env.NOTION_DATABASE_ID

const TaskType = {
  DailyDoing: 'daily_doing',
  DailyPending: 'daily_pending',
  StoryBoard: 'storyboard'
}

async function runTask() {
  const argv = minimist(process.argv);
  const task = argv.task;
  const taskType = argv.type;
  if (!!!task || !!!taskType) {
    outputErr('need task or type');
    return
  }
  
  let taskTag = ''
  switch (taskType) {
    case TaskType.DailyDoing:
      taskTag = 'Daily Highlight';
      break;
    case TaskType.DailyPending:
      taskTag = 'Daily Work Pending';
      break;
    case TaskType.StoryBoard:
      taskTag = 'StoryBoard';
      break;
    default:
      break;
  }

  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: { 
          title:[
            {
              "text": {
                "content": `[!] ${task}`
              }
            }
          ]
        },
        Tags: {
            multi_select: [
                {
                    name: taskTag,
                }
            ]
        },
      },
    })
    outputOk(constructTextMsg('create success!'))
  } catch (error) {
    outputErr(error.body)
  }
}

// main
;(async () => { 
  await runTask();
})();
