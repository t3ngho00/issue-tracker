"use client";

import {
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $setBlocksType } from "@lexical/selection";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Link,
  Quote,
  Code,
} from "lucide-react";
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
} from "@lexical/list";
import { $createQuoteNode } from "@lexical/rich-text";
import { $createHeadingNode } from "@lexical/rich-text";

export function ElementFormatToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const formatText = (format: "bold" | "italic" | "underline") => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const formatHeading = (headingSize: "h1" | "h2") => {
    editor.update(() => {
      const selection = $getSelection();
      if (selection) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  const formatList = (listType: "bullet" | "number") => {
    if (listType === "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    }
  };

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if (selection) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  };

  return (
    <div className="flex gap-1 flex-wrap">
      {/* Headings */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => formatHeading("h1")}
        title="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => formatHeading("h2")}
        title="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </Button>

      {/* Text formatting */}
      <div className="w-px h-6 bg-border mx-1" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => formatText("bold")}
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => formatText("italic")}
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => formatText("underline")}
        title="Underline"
      >
        <Underline className="h-4 w-4" />
      </Button>

      {/* Lists */}
      <div className="w-px h-6 bg-border mx-1" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => formatList("bullet")}
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => formatList("number")}
        title="Numbered List"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      {/* Other elements */}
      <div className="w-px h-6 bg-border mx-1" />
      <Button variant="ghost" size="sm" onClick={formatQuote} title="Quote">
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          /* TODO: Implement code block */
        }}
        title="Code Block"
      >
        <Code className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          /* TODO: Implement link */
        }}
        title="Link"
      >
        <Link className="h-4 w-4" />
      </Button>
    </div>
  );
}
