import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Editor, useEditor } from "@tiptap/react";
import { Link } from "@mantine/tiptap";

const content = "";

function editor() {
    return useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Highlight,
            Color,
            TextStyle,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
        ],
        content,
    });
}

export default editor;
