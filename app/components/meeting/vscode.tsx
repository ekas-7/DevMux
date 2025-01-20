import {
  SandpackProvider,
  SandpackLayout,
  SandpackFileExplorer,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { sandpackDark } from "@codesandbox/sandpack-themes";

export function CodeEditor() {
  const files = {
    "/App.js": {
      code: `export default function App() {
  return <h1>Hello, world!</h1>;
}`,
      active: true,
    },
    "/index.js": {
      code: `import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));`,
    },
  };

  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden">
      <SandpackProvider files={files} theme={sandpackDark} template="react">
        <SandpackLayout style={{ height: "67.5vh" }}>
          <SandpackFileExplorer style={{ height: "100%" }} />
          <SandpackCodeEditor
            style={{ height: "100%" }}
            closableTabs
            showTabs
            wrapContent
          />
          <SandpackPreview style={{ height: "100%" }} />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

export default CodeEditor;