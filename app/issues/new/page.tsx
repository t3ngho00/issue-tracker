"use client";

import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { CodeNode } from "@lexical/code";
import { ParagraphNode, TextNode, BLUR_COMMAND, $getRoot } from "lexical";
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
import { useRouter } from "next/navigation";

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

export function RichTextEditorDemo({
  onChange,
  onBlur,
  disabled,
}: {
  onChange?: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="bg-background w-full overflow-hidden rounded-lg border">
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
        }}
      >
        <TooltipProvider>
          <EditorWithFormIntegration
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
          />
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}

const placeholder = "Start typing...";

function EditorWithFormIntegration({
  onChange,
  onBlur,
}: {
  onChange?: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      if (onChange) {
        editorState.read(() => {
          const root = $getRoot();
          const textContent = root.getTextContent();
          onChange(textContent);
        });
      }
    });
  }, [editor, onChange]);

  useEffect(() => {
    return editor.registerCommand(
      BLUR_COMMAND,
      () => {
        if (onBlur) {
          onBlur();
        }
        return false;
      },
      1,
    );
  }, [editor, onBlur]);

  return <Plugins />;
}

function Plugins() {
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

interface IssueForm {
  title: string;
  description: string;
}
export default function NewIssuePage() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<IssueForm>();
  const router = useRouter();
  const onSubmit = async (data: IssueForm) => {
    try {
      const response = await axios.post("/api/issues/new", data);
      router.push("/issues");
    } catch (error) {
      console.error("Error creating issue:", error);
      alert("Failed to create issue. Please try again.");
    }
  };

  return (
    <form className="max-w-4xl mx-auto p-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-3xl font-bold mb-6">Create New Issue</h1>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium">
            Title
          </Label>
          <Input
            id="title"
            placeholder="Enter issue title..."
            {...register("title")}
            className="text-lg"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Description</Label>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <RichTextEditorDemo
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={field.disabled}
              />
            )}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" className="px-6" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Issue"}
          </Button>
        </div>
      </div>
    </form>
  );
}
