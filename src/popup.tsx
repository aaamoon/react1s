import {
  Box,
  ChakraProvider,
  Link,
  Radio,
  RadioGroup,
  Stack,
  Kbd
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

type Editor = "vscode" | "vscode-insiders" | "webStorm"

async function getCurrentTabUrl() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
  return tabs[0].url
}

function App() {
  const [editor, setEditor] = useState<Editor>("vscode")

  useEffect(() => {
    chrome.storage.local.get(["editor"], ({ editor }) => {
      setEditor(editor ?? "vscode")
    })
  }, [])

  const handleChangeEditor = async (value: Editor) => {
    setEditor(value)
    chrome.storage.local.set({ editor: value })
    const url = new URL(await getCurrentTabUrl())
    chrome.tabs.update({
      url: url.href,
      active: true
    })
    window.close()
  }

  const handleGoGithub = () => {
    chrome.tabs.create({
      url: "https://github.com/aaamoon/react1s"
    })
  }

  return (
    <ChakraProvider>
      <Box w={320} h={150} p={4}>
        <Box mb={2}>按住 <Kbd>⌥ Option(Alt)</Kbd> 同时鼠标左键点击页面元素</Box>
        <Box fontSize={20} mb={2}>
          请选择代码编辑器
        </Box>
        <RadioGroup
          onChange={handleChangeEditor}
          value={editor}
          colorScheme="green">
          <Stack direction="column">
            <Radio value="vscode">VS Code</Radio>
            <Radio value="vscode-insiders">VS Code-insiders</Radio>
            <Radio value="webStorm">WebStorm</Radio>
          </Stack>
        </RadioGroup>
        <Link
          fontSize={16}
          mt={1}
          mb={2}
          float="right"
          color="green"
          onClick={handleGoGithub}>
          react1s
        </Link>
      </Box>
    </ChakraProvider>
  )
}

export default App
