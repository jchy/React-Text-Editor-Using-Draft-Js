import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "./TextEditor.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

export default class TextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    isSaveActive: false,
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
      isSaveActive: false,
    });
  };

  onSaveText = () => {
    this.setState({
      isSaveActive: true,
      textValue: this.editorState,
    });
  };

  onEditText = () => {
    this.setState({
      isSaveActive: false,
    });
  };

  render() {
    const { editorState, isSaveActive } = this.state;
    const retainNewLine = () => {
        return draftToHtml(convertToRaw(editorState.getCurrentContent()))
              .split("\n")
              .map((item) => {
                if (item === "<p></p>") {
                  return "</br>"
                } else return item;
              }).join("");
    };

    return (
      <>
        {isSaveActive ? (
          <div className="editorContainer">
            <div style={{ border: "1px solid black", borderRadius: "4px" }}>
              <div
                style={{ background: "#f5f5f5", minHeight: "120px" }}
                className="saveTextcontainer"
                dangerouslySetInnerHTML={{
                  __html: retainNewLine()
                }}
              ></div>
            </div>
            <div style={{ textAlign: "left", marginTop: "10px" }}>
              <button
                onClick={this.onEditText}
                style={{
                  background: "#000000",
                  color: "#ffffff",
                  border: "1px solid #000000",
                  borderRadius: "4px",
                  padding: "8px 24px",
                  fontSize: "20",
                  fontWeight: "700",
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ) : (
          <div className="editorContainer">
            <div style={{ border: "1px solid black", borderRadius: "4px" }}>
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
                mention={{
                  separator: " ",
                  trigger: "@",
                  suggestions: [
                    { text: "APPLE", value: "apple" },
                    { text: "BANANA", value: "banana", url: "banana" },
                    { text: "CHERRY", value: "cherry", url: "cherry" },
                    { text: "DURIAN", value: "durian", url: "durian" },
                    { text: "EGGFRUIT", value: "eggfruit", url: "eggfruit" },
                    { text: "FIG", value: "fig", url: "fig" },
                    {
                      text: "GRAPEFRUIT",
                      value: "grapefruit",
                      url: "grapefruit",
                    },
                    { text: "HONEYDEW", value: "honeydew", url: "honeydew" },
                  ],
                }}
              />
            </div>
            <div style={{ textAlign: "left", marginTop: "10px" }}>
              <button
                onClick={this.onSaveText}
                style={{
                  background: "#000000",
                  color: "#ffffff",
                  border: "1px solid #000000",
                  borderRadius: "4px",
                  padding: "8px 24px",
                  fontSize: "20",
                  fontWeight: "700",
                }}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}
