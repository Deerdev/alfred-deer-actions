import alfy from 'alfy';
import * as fs from 'fs/promises';
import * as path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const taskPath = process.env.action_tasks_dir;

function filterItem(item, dirPath) {
  return {
    title: item.name,
    subtitle: item.name,
    arg: path.join(dirPath, item.name),
  };
}

async function handlerTasks() {
  const items = [];
  // 1 add default actions
  const defaultActionPath = path.join(__dirname, "default_actions")
  const defaultDirs = await fs.opendir(defaultActionPath);
  for await (const dir of defaultDirs) {
    if (dir.isFile() && !dir.name.startsWith('.')) {
      const scriptType = path.extname(dir.name);
      if (['.js', '.py'].includes(scriptType)) {
        items.push(filterItem(dir, defaultActionPath));
      }
    }
  }

  // 2 add custom actions
  const dirs = await fs.opendir(taskPath);
  for await (const dir of dirs) {
    if (dir.isFile() && !dir.name.startsWith('.')) {
      const scriptType = path.extname(dir.name);
      if (['.js', '.py'].includes(scriptType)) {
        items.push(filterItem(dir, taskPath));
      }
    }
  }
  
  alfy.output(items);
}

// main
handlerTasks();
