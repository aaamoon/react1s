const openComponentInEditor = (tabId: number) => {
  const _tabId = "o" + tabId
  if (window[_tabId]) return
  window[_tabId] = true

  type DebugSource = {
    columnNumber?: number
    fileName?: string
    lineNumber?: number
  }
  type FiberNode = {
    _debugSource?: DebugSource
    _debugOwner?: FiberNode
  }

  const getFallbackDebugSourceFromElement = (element: HTMLElement) => {
    const parentElement = element.parentElement
    if (element.tagName === "HTML" || parentElement === null) {
      console.warn("Couldn't find a React instance for the element")
      return
    }
    let fiberNodeInstance: FiberNode
    for (const key in element) {
      if (
        key.startsWith("__reactInternalInstance") ||
        key.startsWith("__reactFiber$")
      ) {
        fiberNodeInstance = element[key]
      }
    }
    const { _debugSource } = fiberNodeInstance ?? {}
    if (_debugSource) return _debugSource
    return getFallbackDebugSourceFromElement(parentElement)
  }

  const getFallbackDebugSource = (
    fiberNodeInstance: FiberNode,
    element: HTMLElement
  ) => {
    if (fiberNodeInstance?._debugOwner) {
      if (fiberNodeInstance._debugOwner._debugSource) {
        return fiberNodeInstance._debugOwner._debugSource
      } else {
        return getFallbackDebugSource(fiberNodeInstance._debugOwner, element)
      }
    } else {
      return getFallbackDebugSourceFromElement(element)
    }
  }

  const getDebugSource = (element: HTMLElement) => {
    let fiberNodeInstance: FiberNode
    // 支持 Vue3
    if (
      element["__vueParentComponent"] &&
      element["__vueParentComponent"]?.type
    ) {
      const { __file } = element["__vueParentComponent"]?.type ?? {}
      return {
        fileName: __file,
        lineNumber: 1,
        columnNumber: 1
      }
    }
    for (const key in element) {
      if (
        key.startsWith("__reactInternalInstance") ||
        key.startsWith("__reactFiber$")
      ) {
        fiberNodeInstance = element[key]
      }
    }
    const { _debugSource } = fiberNodeInstance ?? {}
    if (_debugSource) return _debugSource
    const fallbackDebugSource = getFallbackDebugSource(
      fiberNodeInstance,
      element
    )
    return fallbackDebugSource
  }

  // Option(Alt) + Click
  window.addEventListener("click", (event) => {
    event.stopPropagation()
    if (event.altKey) {
      const { target } = event
      if (target instanceof HTMLElement) {
        const debugSource: DebugSource = getDebugSource(target)
        if (debugSource) {
          window.postMessage({ debugSource }, "*")
        }
      }
    }
  })
}

const injectedHelper = (tabId: number) => {
  chrome.scripting.executeScript({
    target: {
      tabId
    },
    world: "MAIN",
    func: openComponentInEditor,
    args: [tabId]
  })
}

export default injectedHelper
