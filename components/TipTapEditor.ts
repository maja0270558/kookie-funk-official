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

const content = "";

function editor(placeholder: string) {
    return useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Highlight,
            Color,
            TextStyle,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Placeholder.configure({ placeholder: placeholder }),
            Image,
            Youtube,
        ],
        content,
    });
}

export default editor;
