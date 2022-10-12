

export const outputResult = (result) => {
  // using console to direct output string result
  /*
  # normal message:
  code,result_type,result[,...result]
  0,1,"ok"

  # error message:
  code, result
  1,"error"
  */
  console.log(result);
}

export const outputOk = (result) => {
  outputResult(`${ExitCode.OK},${result}`);
}

export const outputErr = (result) => {
  outputResult(`${ExitCode.ERR},${result}`)
}

export const ExitCode = {
  OK: 0,
  ERR: 1
}

/*
# result type (input from script):
- 1: text, showing by notification
- 2: open url with browser
- 3: open app with deeplink
*/
export const MsgType = {
  TEXT: 1,
  URL: 2,
  DEEPLINK: 3
}

export const constructTextMsg = (msg) => {
  return `${MsgType.TEXT},${msg}`;
}

export const constructUrlMsg = (msg) => {
  return `${MsgType.URL},${msg}`;
}

export const constructDeepLinkMsg = (msg) => {
  return `${MsgType.DEEPLINK},${msg}`;
}
