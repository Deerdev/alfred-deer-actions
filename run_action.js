import alfy from 'alfy';
import * as path from 'path';
import * as process from 'child_process';

function outputResult(result) {
  // using console to direct output string result
  console.log(result);
}

async function runTask() {
  const scriptPath = alfy.input;
  const scriptType = path.extname(scriptPath);
  const scriptName = path.basename(scriptPath);
  let scriptCmd = '';
  switch (scriptType) {
    case '.py':
      scriptCmd = `python3 ${scriptPath}`;
      break;

    default:
      break;
  }
  if (scriptCmd.length > 0) {
    try {
      process.exec(scriptCmd, (err, stdout, stderr) => {
        if (err) {
          outputResult(`error: ${err}`);
        } else if (stderr) {
          outputResult(`error: ${stderr}`);
        } else {
          outputResult(stdout);
        }
      });
    } catch (error) {
      outputResult(`error: ${error}`);
    }
  } else {
    outputResult(`error: not support this script ${scriptName}`);
  }
}

// main
runTask();
