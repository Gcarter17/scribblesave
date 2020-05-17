import React, { useContext, Component, PropTypes } from 'react';
import RichTextEditor from 'react-rte';

class MyEditor extends Component {

    state = {
        // value: RichTextEditor.createEmptyValue(),
        value: RichTextEditor.createValueFromString(`${this.props.content}`, "html"),
        format: 'html'
    }



    onChange = (value) => {
        this.setState({ value });
        if (this.props.onChange) {
            // Send the changes up to the parent component as an HTML string.
            // This is here to demonstrate using `.toString()` but in a real app it
            // would be better to avoid generating a string on each change.
            this.props.onChange(
                value.toString('html')
            );
        }
        // this.props.onChange(value)
    };

    render() {

        return (
            <>
                <RichTextEditor
                    className={this.props.styles}
                    // value={this.state.value.toString('html')}
                    value={this.state.value}
                    onChange={this.onChange}
                    readOnly={this.props.readOnly}
                />
                {/* <span onClick={this.props.updateContact(this.state.value.toString())}>click here</span> */}
            </>
        );
    }
}

export default MyEditor

