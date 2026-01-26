"use client";

import { useState } from "react";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { CodeNode } from "@lexical/code";
import { ParagraphNode, TextNode } from "lexical";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

import { ContentEditable } from "@/components/editor/editor-ui/content-editable";
import { ElementFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/element-format-toolbar-plugin";
import { ToolbarPlugin } from "@/components/editor/plugins/toolbar/toolbar-plugin";
import { editorTheme } from "@/components/editor/themes/editor-theme";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes: [
    HeadingNode,
    ParagraphNode,
    TextNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    LinkNode,
    CodeNode,
  ],
  onError: (error: Error) => {
    console.error(error);
  },
};

export function RichTextEditorDemo() {
  return (
    <div className="bg-background w-full overflow-hidden rounded-lg border">
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
        }}
      >
        <TooltipProvider>
          <Plugins />
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}

const placeholder = "Start typing...";

export function Plugins() {
  return (
    <div className="relative">
      {/* toolbar plugins */}
      <ToolbarPlugin>
        {() => (
          <div className="vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto border-b p-1">
            <ElementFormatToolbarPlugin />
          </div>
        )}
      </ToolbarPlugin>

      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <div className="">
              <div className="">
                <ContentEditable
                  placeholder={placeholder}
                  className="ContentEditable__root relative block h-72 min-h-72 overflow-auto px-8 py-4 focus:outline-none"
                />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <TabIndentationPlugin />
        <ListPlugin />
        <LinkPlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        {/* rest of the plugins */}
      </div>
    </div>
  );
}

export default function NewIssuePage() {
  const [title, setTitle] = useState("");

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create New Issue</h1>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium">
            Title
          </Label>
          <Input
            id="title"
            placeholder="Enter issue title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Description</Label>
          <RichTextEditorDemo />
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" className="px-6">
            Create Issue
          </Button>
          <Button variant="outline" type="button">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
