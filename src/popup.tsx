import {
  Box,
  Button,
  ChakraProvider,
  Input,
  Kbd,
  Link,
  Radio,
  RadioGroup,
  Stack
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

type Editor = "vscode" | "vscode-insiders" | "webStorm" | "custom"

async function getCurrentTabUrl() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
  return tabs[0].url
}

function App() {
  const [editor, setEditor] = useState<Editor>("vscode")
  const [customPath, setCustomPath] = useState<string>("")

  useEffect(() => {
    chrome.storage.local.get(["editor"], ({ editor }) => {
      setEditor(editor ?? "vscode")
    })
    chrome.storage.local.get(["customPath"], ({ customPath }) => {
      setCustomPath(
        customPath ?? "vscode://file/${fileName}:${lineNumber}:${columnNumber}"
      )
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

  const handleConfirmInput = async () => {
    const url = new URL(await getCurrentTabUrl())
    chrome.tabs.update({
      url: url.href,
      active: true
    })
    window.close()
  }

  const handleChangeCustomPath = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomPath(e.target.value)
    chrome.storage.local.set({ customPath: e.target.value })
  }

  const handleGoGithub = () => {
    chrome.tabs.create({
      url: "https://github.com/aaamoon/react1s"
    })
  }

  return (
    <ChakraProvider>
      <Box w={350} h={150} p={4}>
        <Box mb={2}>
          按住 <Kbd>⌥ Option(Alt)</Kbd> 同时鼠标左键点击页面元素
        </Box>
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
            <Radio value="custom">自定义路径</Radio>
          </Stack>
        </RadioGroup>
        {editor === "custom" ? (
          <Box display="flex">
            <Input
              size={"sm"}
              value={customPath}
              onChange={handleChangeCustomPath}
            />
            <Button
              ml={1}
              size={"sm"}
              colorScheme="teal"
              onClick={handleConfirmInput}>
              更新
            </Button>
          </Box>
        ) : null}
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
