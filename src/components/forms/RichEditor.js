import React, { Component, useEffect, useContext, useState } from "react";
import RichTextEditor from "react-rte";
import ScribbleContext from "../../context/scribble/scribbleContext";

class MyEditor extends Component {
  state = {
    value: RichTextEditor.createValueFromString(
      `${this.props.content}`,
      "markdown"
    ),
  };

  onChange = (value) => {
    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(value.toString("html"));
    }
    console.log(this.state.value.toString("html"), "THIS.STATE.VALUE");

  };


  render() {
    return (
      <RichTextEditor
        className={this.props.styles}
        // value={this.state.value.toString('html')}
        value={this.state.value}
        onChange={this.onChange}
        readOnly={this.props.readOnly}
      />
    );
  }
}

export default MyEditor;
