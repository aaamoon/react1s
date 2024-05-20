const openComponentInEditor = (tabId: number, maxDeep = 3) => {
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

  const getFallbackDebugSourceFromElement = (element: HTMLElement, deep: number, debugSourceList: DebugSource[]) => {
    const parentElement = element.parentElement
    if (element.tagName === "HTML" || parentElement === null) {
      console.warn("Couldn't find a React instance for the element")
      return debugSourceList
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
    if (_debugSource) {
      debugSourceList.push(_debugSource)
      if (debugSourceList.length >= deep) {
        return debugSourceList
      }
    }
    return getFallbackDebugSourceFromElement(parentElement, deep, debugSourceList)
  }

  const getFallbackDebugSource = (
    fiberNodeInstance: FiberNode,
    element: HTMLElement,
    deep: number,
    debugSourceList: DebugSource[],
  ) => {
    if (fiberNodeInstance?._debugOwner) {
      if (fiberNodeInstance._debugOwner._debugSource) {
        debugSourceList.push(fiberNodeInstance._debugOwner._debugSource)
        if (debugSourceList.length >= deep) {
          return debugSourceList
        }
        return getFallbackDebugSource(fiberNodeInstance._debugOwner, element, deep, debugSourceList)
      } else {
        return getFallbackDebugSource(fiberNodeInstance._debugOwner, element, deep, debugSourceList)
      }
    } else {
      return getFallbackDebugSourceFromElement(element, deep, debugSourceList)
    }
  }

  const getDebugSource = (element: HTMLElement, deep: number) => {
    let fiberNodeInstance: FiberNode
    // 支持 Vue3
    if (
      element["__vueParentComponent"] &&
      element["__vueParentComponent"]?.type
    ) {
      const { __file } = element["__vueParentComponent"]?.type ?? {}
      return [{
        fileName: __file,
        lineNumber: 1,
        columnNumber: 1
      }]
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
    if (_debugSource && deep === 1) {
      return [_debugSource]
    }
    const debugSourceList: DebugSource[] = []
    getFallbackDebugSource(
      fiberNodeInstance,
      element,
      deep,
      debugSourceList,
    )
    return debugSourceList
  }

  // Option(Alt) + Click
  window.addEventListener("click", (event) => {
    if (event.altKey) {
      event.stopPropagation()
      event.preventDefault()
      const deep = event.ctrlKey ? maxDeep : 1;
      const { target } = event
      if (target instanceof HTMLElement) {
        const debugSource: DebugSource[] = getDebugSource(target, deep)
        if (debugSource) {
          window.postMessage({ debugSource }, "*")
        }
      }
    }
  })
}

const injectedHelper = (tabId: number) => {
  chrome.storage.local.get(["maxDeep"], ({ maxDeep }) => {
    chrome.scripting.executeScript({
      target: {
        tabId
      },
      world: "MAIN",
      func: openComponentInEditor,
      args: [tabId, maxDeep ?? 3]
    })
  })
}

export default injectedHelper
