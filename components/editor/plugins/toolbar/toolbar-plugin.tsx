"use client";

import { ReactNode } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import { useCallback, useEffect, useState } from "react";

interface ToolbarPluginProps {
  children: (props: { blockType: string }) => ReactNode;
}

export function ToolbarPlugin({ children }: ToolbarPluginProps) {
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState("paragraph");

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // For simplicity, just set to paragraph
      setBlockType("paragraph");
    }
  }, []);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  return <>{children({ blockType })}</>;
}
