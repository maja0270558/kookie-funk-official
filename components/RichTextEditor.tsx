import { RichTextEditor, useRichTextEditorContext } from "@mantine/tiptap";
import { IconPhoto, IconVideo } from "@tabler/icons";
import { Editor } from "@tiptap/react";
import React from "react";
import { Popover, TextInput, NumberInput } from "@mantine/core";
import { useState } from "react";
import classNames from "classnames";

function ImageControl() {
    const { editor } = useRichTextEditorContext();
    const [url, setURL] = useState<string>("");

    return (
        <Popover
            width={300}
            trapFocus
            position="bottom"
            withArrow
            shadow="md"
            onClose={() => {
                setURL("");
            }}
        >
            <Popover.Target>
                <RichTextEditor.Control
                    aria-label="Insert Image"
                    title="Insert Image"
                >
                    <IconPhoto stroke={1.5} size={16} />
                </RichTextEditor.Control>
            </Popover.Target>
            <Popover.Dropdown>
                <div className="flex flex-auto gap-2">
                    <TextInput
                        className="flex-1"
                        label="Image URL"
                        placeholder="Link"
                        size="xs"
                        onChange={(e) => {
                            setURL(e.target.value);
                        }}
                    />
                    <button
                        className=" place-self-end btn btn-xs btn-primary mt-2"
                        onClick={() => {
                            if (url) {
                                editor
                                    .chain()
                                    .focus()
                                    .setImage({ src: url })
                                    .run();
                            }
                        }}
                    >
                        OK
                    </button>
                </div>
            </Popover.Dropdown>
        </Popover>
    );
}

function YoutubeControl() {
    const { editor } = useRichTextEditorContext();
    const [height, setHeight] = useState<number | undefined>(NaN);
    const [url, setURL] = useState<string>("");

    return (
        <Popover
            width={300}
            trapFocus
            position="bottom"
            withArrow
            shadow="md"
            onClose={() => {
                setHeight(NaN);
                setURL("");
            }}
        >
            <Popover.Target>
                <RichTextEditor.Control
                    onClick={() => { }}
                    aria-label="Insert Youtube"
                    title="Insert Youtube"
                >
                    <IconVideo stroke={1.5} size={16} />
                </RichTextEditor.Control>
            </Popover.Target>
            <Popover.Dropdown>
                <div className="flex flex-col">
                    <TextInput
                        className="flex-1"
                        label="Youtube URL"
                        placeholder="Link"
                        size="xs"
                        onChange={(e) => {
                            setURL(e.target.value);
                        }}
                    />
                    <div className="flex flex-row gap-2">
                        <NumberInput
                            size="xs"
                            placeholder="AUTO"
                            label="Height"
                            onChange={(v) => {
                                v && setHeight(v);
                            }}
                        />
                    </div>

                    <button
                        className=" place-self-end btn btn-xs btn-primary mt-2"
                        onClick={() => {
                            if (url) {
                                editor.commands.setYoutubeVideo({
                                    src: url,
                                    height: height,
                                });
                            }
                        }}
                    >
                        OK
                    </button>
                </div>
            </Popover.Dropdown>
        </Popover>
    );
}

const PostEditor = (props: { editor: Editor | null }) => {
    return (
        <RichTextEditor editor={props.editor} className="">
            <RichTextEditor.Toolbar sticky stickyOffset={0}>
                <RichTextEditor.ColorPicker
                    colors={[
                        "#ffffff",
                        "#25262b",
                        "#868e96",
                        "#fa5252",
                        "#e64980",
                        "#be4bdb",
                        "#7950f2",
                        "#4c6ef5",
                        "#228be6",
                        "#15aabf",
                        "#12b886",
                        "#40c057",
                        "#82c91e",
                        "#fab005",
                        "#fd7e14",
                    ]}
                />
                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Highlight />
                    {/* <RichTextEditor.Code /> */}
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                    <RichTextEditor.H5 />
                    <RichTextEditor.H6 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Blockquote />
                    <RichTextEditor.Hr />
                    <RichTextEditor.BulletList />
                    <RichTextEditor.OrderedList />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Link />
                    <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.AlignLeft />
                    <RichTextEditor.AlignCenter />
                    <RichTextEditor.AlignJustify />
                    <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <ImageControl />
                    <YoutubeControl />
                </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>
            <RichTextEditor.Content />
        </RichTextEditor>
    );
};

export default PostEditor;
