import alfy from 'alfy';
import * as path from 'path';
import * as process from 'child_process';
import { outputOk, outputErr } from './utils.js'


async function runTask() {
  const scriptPath = alfy.input;
  const scriptType = path.extname(scriptPath);
  const scriptName = path.basename(scriptPath);
  let scriptCmd = '';
  switch (scriptType) {
    case '.py':
      scriptCmd = `python3 ${scriptPath}`;
      break;
    case '.js':
      scriptCmd = `node ${scriptPath}`
    default:
      break;
  }
  if (scriptCmd.length > 0) {
    try {
      process.exec(scriptCmd, (err, stdout, stderr) => {
        if (err) {
          outputErr(err);
        } else if (stderr) {
          outputErr(stderr);
        } else {
          outputOk(stdout);
        }
      });
    } catch (error) {
      outputErr(error);
    }
  } else {
    outputErr(`not support this script ${scriptName}`);
  }
}

// main
runTask();
