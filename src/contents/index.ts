import type { PlasmoContentScript } from "plasmo"

export const config: PlasmoContentScript = {
  matches: ["*://*/*"]
}

function getSchemeUrl(editor: string, customPath: string, debugSource: any) {
  const { columnNumber = 0, fileName, lineNumber } = debugSource
  let url = ""
  if (editor === "webStorm") {
    url = `webstorm://open?file=${fileName}&line=${lineNumber}&column=${columnNumber}`
  } else if (editor === "custom") {
    url = (
      customPath ??
      "vscode://file/${fileName}:${lineNumber}:${columnNumber}"
    )
      .replace(/\$\{fileName\}/g, fileName)
      .replace(/\$\{lineNumber\}/g, lineNumber)
      .replace(/\$\{columnNumber\}/g, columnNumber)
  } else {
    url = `${editor || "vscode"}://file/${fileName}:${lineNumber}:${columnNumber}`
  }
  return url
}

chrome.storage.local.get(["editor"], ({ editor }) => {
  chrome.storage.local.get(["customPath"], ({ customPath }) => {
    window.addEventListener(
      "message",
      (message) => {
        const debugSource = message?.data?.debugSource
        if (!debugSource || !debugSource.length) return
        const [firstDebugSource, ...ext] = debugSource

        if (!ext.length) {
          const url = getSchemeUrl(editor, customPath, firstDebugSource)
          const iframe = document.createElement("iframe")
          iframe.style.display = "none"
          iframe.src = url
          document.body.appendChild(iframe)
          setTimeout(() => {
            iframe.remove()
          }, 100)
          return;
        }

        const list = document.createElement("ul")
        list.style.position = "fixed"
        list.style.top = "10px"
        list.style.right = "10px"
        list.style.zIndex = "9999999"
        list.style.backgroundColor = "white"
        list.style.padding = "10px"
        list.style.border = "1px solid #ccc"
        list.style.borderRadius = "5px"
        list.style.listStyle = "none"
        list.style.margin = "0"
        list.style.maxHeight = "400px"
        list.style.overflow = "auto"
        list.style.maxWidth = "80%"
        list.style.boxShadow = "0 0 10px #ccc"
        list.style.color = "#333"
        list.style.wordBreak = "break-all"

        debugSource.forEach((item, index) => {
          const li = document.createElement("li")
          const a = document.createElement("a")
          a.href = getSchemeUrl(editor, customPath, item)
          a.target = "_blank"
          a.innerText = `${item.fileName}:${item.lineNumber}:${item.columnNumber}`
          li.appendChild(a)
          if (index > 0) {
            li.style.marginTop = "5px"
            li.style.textIndent = `${index * 10}px`
          }
          list.appendChild(li)
        })

        list.addEventListener("click", (e) => {
          list.remove()
        }, {
          once: true
        })
        document.body.appendChild(list)
      },
      false
    )
  })
})

