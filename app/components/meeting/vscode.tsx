import { useState } from "react";
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
    <SandpackProvider files={files} theme={sandpackDark} template="react">
      <SandpackLayout style={{ height: "60vh" }}>
        {/* sidebar -- isko rehn dena */}
        <SandpackFileExplorer style={{ height: "100%" }} />

        {/* tabs */}
        <SandpackCodeEditor
          style={{ height: "100%" }}
          closableTabs
          showTabs
          wrapContent
        />

        {/* code running */}
        <SandpackPreview style={{ height: "100%" }} />
      </SandpackLayout>
    </SandpackProvider>
  );
}
