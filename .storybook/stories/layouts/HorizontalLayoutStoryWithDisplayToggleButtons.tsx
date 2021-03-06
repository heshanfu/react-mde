import * as React from "react";
import * as Showdown from "showdown";
import ReactMde, {ReactMdeTypes} from "../../../src/index";
import {storiesOf} from "@storybook/react";
import {HorizontalLayoutOptions} from "../../../src/components-layout";

interface VerticalLayoutStoryComponentState {
    mdeState: ReactMdeTypes.MdeState;
}

class VerticalLayoutStoryComponent extends React.Component<{}, VerticalLayoutStoryComponentState> {
    converter: Showdown.Converter;

    constructor(props) {
        super(props);
        this.state = {
            mdeState: {
                markdown: "**Hello world!**",
            },
        };
        this.converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true,
        });
    }

    handleValueChange = (mdeState: ReactMdeTypes.MdeState) => {
        this.setState({mdeState});
    }

    render() {
        return (
            <ReactMde
                layout="horizontal"
                onChange={this.handleValueChange}
                editorState={this.state.mdeState}
                layoutOptions={{
                    displayToggleButtons: true,
                } as HorizontalLayoutOptions}
                generateMarkdownPreview={(markdown) => Promise.resolve(this.converter.makeHtml(markdown))}
            />
        );
    }
}

storiesOf("Layouts", module)
    .add("horizontal with displayToggleButtons", () => (
        <VerticalLayoutStoryComponent/>
    ));
