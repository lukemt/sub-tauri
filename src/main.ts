// import { invoke } from "@tauri-apps/api/core";
// import { writeTextFile, readTextFile } from '@tauri-apps/api/fs';
// import { appConfigDir } from '@tauri-apps/api/path';

import messages from './messages.yaml';
// const messagesYAML = readTextFile()

const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
async function getRandomMessage(): Promise<string> {
  const messageList = messages.messages;
  const randomIndex = Math.floor(Math.random() * messageList.length);
  return messageList[randomIndex];
}

async function showMsg(msg: string) {

  // Show the message and the window
  const messageElement = document.getElementById("message");
  if (!messageElement) {
    console.error("Upsie");
    return;
  }
  messageElement.innerHTML = msg;
  messageElement.classList.remove("hidden");
  // await invoke("show_window");

  await sleep(2000)
  // Hide the message and the window after 1 second
  document.getElementById("message")?.classList.add("hidden");
  // await invoke("hide_window");

}

async function cycle() {

  const msgs = await getRandomMessage();

  if (Array.isArray(msgs)) {
    for (let msg of msgs) {
      await showMsg(msg);
    }
  } else if (typeof msgs === "string") {
    await showMsg(msgs)
  }
  setTimeout(cycle, 12000);
}

window.addEventListener("DOMContentLoaded", () => {
  cycle();
});
