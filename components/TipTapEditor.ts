import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Editor, useEditor } from "@tiptap/react";
import { Link } from "@mantine/tiptap";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import HardBreak from "@tiptap/extension-hard-break"

const content = "";

import { mergeAttributes } from "@tiptap/react";

export const AlignImage = Image.extend({
    addOptions() {
        return {
            ...Image.options,
            sizes: ["inline", "block", "left", "right"],
        };
    },
    renderHTML({ HTMLAttributes }) {
        const { style } = HTMLAttributes;
        return [
            "figure",
            { style },
            [
                "img",
                mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
            ],
        ];
    },
});

function editor(placeholder: string, contentChange?: () => void) {
    return useEditor({
        onUpdate({ editor }) {
            contentChange && contentChange();
        },
        parseOptions: {
            preserveWhitespace: 'full'
        },
        extensions: [
            StarterKit,
            Underline,
            Link,
            Highlight,
            Color,
            TextStyle,
            TextAlign.configure({ types: ["heading", "paragraph", "image"] }),
            Placeholder.configure({ placeholder: placeholder }),
            AlignImage,
            Youtube,
            HardBreak.configure({
                HTMLAttributes: {
                    class: 'custom-render-html',
                },
            })
        ],
        autofocus: true,
        content,
    });
}

export default editor;
