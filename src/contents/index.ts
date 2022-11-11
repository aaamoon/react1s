import type { PlasmoContentScript } from "plasmo"

export const config: PlasmoContentScript = {
  matches: ["*://*/*"]
}

chrome.storage.local.get(["editor"], ({ editor }) => {
  window.addEventListener(
    "message",
    (message) => {
      const debugSource = message?.data?.debugSource
      if (!debugSource) return
      const { columnNumber, fileName, lineNumber } = debugSource
      let url = ""
      if (editor === "webStorm") {
        url = `webstorm://open?file=${fileName}&line=${lineNumber}&column=${columnNumber}`
      } else {
        url = `${
          editor || "vscode"
        }://file/${fileName}:${lineNumber}:${columnNumber}`
      }
      const iframe = document.createElement("iframe")
      iframe.src = url
      document.body.appendChild(iframe)
      setTimeout(() => {
        iframe.remove()
      }, 100)
    },
    false
  )
})
