import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import "../node_modules/draft-js/dist/Draft.css";
import { Button } from "@mui/material";

function App() {
  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      const state = JSON.parse(savedContent);
      const contentState = convertFromRaw(state);
      return EditorState.createWithContent(contentState);
    } else {
      return EditorState.createEmpty();
    }
  });

  const inlineStyleMap = {
    RED_TEXT: {
      color: "red",
    },
    UNDERLINE: {
      textDecoration: "underline",
    },
  };

  const handleBeforeInput = (chars, editorState) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const currentBlock = contentState.getBlockForKey(selection.getStartKey());

    if (
      selection.getStartOffset() === 1 &&
      chars === " " &&
      currentBlock.getText()[0] === "#"
    ) {
      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 1,
        }),
        "",
        editorState.getCurrentInlineStyle(),
      );

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "remove-range",
      );

      let finalEditorState = RichUtils.toggleBlockType(
        newEditorState,
        "header-one",
      );

      if (finalEditorState.getCurrentInlineStyle().has("RED_TEXT")) {
        finalEditorState = RichUtils.toggleInlineStyle(
          finalEditorState,
          "RED_TEXT",
        );
      }

      if (finalEditorState.getCurrentInlineStyle().has("UNDERLINE")) {
        finalEditorState = RichUtils.toggleInlineStyle(
          finalEditorState,
          "UNDERLINE",
        );
      }

      if (finalEditorState.getCurrentInlineStyle().has("BOLD")) {
        finalEditorState = RichUtils.toggleInlineStyle(
          finalEditorState,
          "BOLD",
        );
      }

      setEditorState(finalEditorState);
      return true;
    }

    if (
      selection.getStartOffset() === 1 &&
      chars === " " &&
      currentBlock.getText()[0] === "*"
    ) {
      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 1,
        }),
        "",
        editorState.getCurrentInlineStyle(),
      );

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "remove-range",
      );

      let finalEditorState = RichUtils.toggleInlineStyle(
        newEditorState,
        "BOLD",
      );

      if (finalEditorState.getCurrentInlineStyle().has("RED_TEXT")) {
        finalEditorState = RichUtils.toggleInlineStyle(
          finalEditorState,
          "RED_TEXT",
        );
      }

      if (finalEditorState.getCurrentInlineStyle().has("UNDERLINE")) {
        finalEditorState = RichUtils.toggleInlineStyle(
          finalEditorState,
          "UNDERLINE",
        );
      }

      setEditorState(finalEditorState);
      return true;
    }

    if (
      selection.getStartOffset() === 2 &&
      chars === " " &&
      currentBlock.getText()[0] === "*" &&
      currentBlock.getText()[1] === "*"
    ) {
      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 2,
        }),
        "",
        editorState.getCurrentInlineStyle(),
      );

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "remove-range",
      );

      let finalEditorState = RichUtils.toggleInlineStyle(
        newEditorState,
        "RED_TEXT",
      );

      if (finalEditorState.getCurrentInlineStyle().has("BOLD")) {
        finalEditorState = RichUtils.toggleInlineStyle(
          finalEditorState,
          "BOLD",
        );
      }

      if (finalEditorState.getCurrentInlineStyle().has("UNDERLINE")) {
        finalEditorState = RichUtils.toggleInlineStyle(
          finalEditorState,
          "UNDERLINE",
        );
      }

      setEditorState(finalEditorState);
      return true;
    }

    if (
      selection.getStartOffset() === 3 &&
      chars === " " &&
      currentBlock.getText()[0] === "*" &&
      currentBlock.getText()[1] === "*" &&
      currentBlock.getText()[2] === "*"
    ) {
      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 3,
        }),
        "",
        editorState.getCurrentInlineStyle(),
      );

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "remove-range",
      );

      let finalEditorState = RichUtils.toggleInlineStyle(
        newEditorState,
        "UNDERLINE",
      );

      if (finalEditorState.getCurrentInlineStyle().has("RED_TEXT")) {
        finalEditorState = RichUtils.toggleInlineStyle(
          finalEditorState,
          "RED_TEXT",
        );
      }

      if (finalEditorState.getCurrentInlineStyle().has("BOLD")) {
        finalEditorState = RichUtils.toggleInlineStyle(
          finalEditorState,
          "BOLD",
        );
      }

      setEditorState(finalEditorState);
      return true;
    }
  };

  const handleKeyCommand = (command, editorState) => {
    if (
      command === "split-block" &&
      RichUtils.getCurrentBlockType(editorState) !== "unstyled"
    ) {
      const contentState = editorState.getCurrentContent();
      const selectionState = editorState.getSelection();
      const splitContentState = Modifier.splitBlock(
        contentState,
        selectionState,
      );
      const splitEditorState = EditorState.push(
        editorState,
        splitContentState,
        "split-block",
      );

      const finalEditorState = RichUtils.toggleBlockType(
        splitEditorState,
        "unstyled",
      );

      setEditorState(finalEditorState);
      return "handled";
    }

    if (
      command === "split-block" &&
      editorState.getCurrentInlineStyle().has("BOLD")
    ) {
      const contentState = editorState.getCurrentContent();
      const selectionState = editorState.getSelection();
      const splitContentState = Modifier.splitBlock(
        contentState,
        selectionState,
      );
      const splitEditorState = EditorState.push(
        editorState,
        splitContentState,
        "split-block",
      );
      const finalEditorState = RichUtils.toggleInlineStyle(
        splitEditorState,
        "BOLD",
      );

      setEditorState(finalEditorState);
      return "handled";
    }

    if (
      command === "split-block" &&
      editorState.getCurrentInlineStyle().has("RED_TEXT")
    ) {
      const contentState = editorState.getCurrentContent();
      const selectionState = editorState.getSelection();
      const splitContentState = Modifier.splitBlock(
        contentState,
        selectionState,
      );
      const splitEditorState = EditorState.push(
        editorState,
        splitContentState,
        "split-block",
      );
      const finalEditorState = RichUtils.toggleInlineStyle(
        splitEditorState,
        "RED_TEXT",
      );

      setEditorState(finalEditorState);
      return "handled";
    }

    if (
      command === "split-block" &&
      editorState.getCurrentInlineStyle().has("UNDERLINE")
    ) {
      const contentState = editorState.getCurrentContent();
      const selectionState = editorState.getSelection();
      const splitContentState = Modifier.splitBlock(
        contentState,
        selectionState,
      );
      const splitEditorState = EditorState.push(
        editorState,
        splitContentState,
        "split-block",
      );
      const finalEditorState = RichUtils.toggleInlineStyle(
        splitEditorState,
        "UNDERLINE",
      );

      setEditorState(finalEditorState);
      return "handled";
    }
    return "not-handled";
  };

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const content = convertToRaw(contentState);
    const stringed = JSON.stringify(content);
    localStorage.setItem("editorContent", stringed);
    alert("Content saved!");
  };

  return (
    <>
      <main className="p-0 m-0 h-screen w-screen flex flex-col items-center">
        <div className="flex items-end justify-around mb-4">
          <div>
            <p className="font-bold text-xl w-full text-center">
              Demo Editor Kartikey Sharma
            </p>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
        <div className="bg-white h-2/5 w-7/12 border-2 border-black border-solid">
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            handleBeforeInput={handleBeforeInput}
            handleKeyCommand={handleKeyCommand}
            customStyleMap={inlineStyleMap}
          />
        </div>
        <div className="flex items-end justify-around mb-4 pt-12px m-2px">
          <div className="bg-blue">
            <div className="flex items-center">
              <p classNam="mr-6" />
              Start with `# ` to put content in Heading
            </div>
            <div className="flex items-center">
              <p className="mr-2" />
              Start with `* ` to put content in Bold
            </div>
            <div className="flex items-center">
              <p className=" mr-2" />
              Start with `** ` to put content in Red Color
            </div>
            <div className="flex items-center">
              <p className="mr-2" />
              Start with `*** ` to put content in Underline
            </div>
            <div className="flex items-center">
              <p className="mr-2" />
              Press <KeyboardReturnIcon sx={{ transform: "scaleX(-1)" }} />{" "}
              Enter to go to new line, subsequently new line has no style
              initially
            </div>
            <div className="flex items-center">
              <p className="mr-2" />
              Press `Save` Button to save your data
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
