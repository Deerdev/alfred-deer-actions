import alfy from 'alfy';
import * as fs from 'fs/promises';
import * as path from 'path';

const taskPath = process.env.action_tasks_dir;

function filterItem(item) {
  return {
    title: item.name,
    subtitle: item.name,
    arg: path.join(taskPath, item.name),
  };
}

async function handlerTasks() {
  const dirs = await fs.opendir(taskPath);
  const items = [];
  for await (const dir of dirs) {
    if (dir.isFile() && !dir.name.startsWith('.')) {
      items.push(filterItem(dir));
    }
  }
  alfy.output(items);
}

// main
handlerTasks();
