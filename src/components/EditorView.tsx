import React, { useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, Check } from 'lucide-react';
import { EditorState } from '../types';

interface EditorViewProps {
  value: string;
  editorState: EditorState;
  onChange: (value: string | undefined) => void;
  onMount?: (editor: any) => void;
}

export const EditorView: React.FC<EditorViewProps> = ({
  value,
  editorState,
  onChange,
  onMount
}) => {
  const editorInstanceRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorInstanceRef.current = editor;
    
    monaco.editor.defineTheme('technicalDark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#151619',
        'editor.lineHighlightBackground': '#1A1A1A',
        'editorLineNumber.foreground': '#8E9299',
        'editor.selectionBackground': '#2C2D31',
      }
    });

    monaco.editor.setTheme('technicalDark');
    if (onMount) onMount(editor);
  };

  return (
    <div className="flex-1 bg-[#151619] relative">
      <Editor
        height="100%"
        defaultLanguage="json"
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          fontSize: 14,
          fontFamily: '"JetBrains Mono", monospace',
          minimap: { enabled: false },
          wordWrap: 'on',
          lineHeight: 1.6,
          bracketPairColorization: { enabled: true },
          automaticLayout: true,
          scrollBeyondLastLine: false,
          padding: { top: 20, bottom: 20 },
          formatOnPaste: true,
          suggestOnTriggerCharacters: true,
          folding: true,
          showFoldingControls: 'always',
        }}
      />

      <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
        <AnimatePresence>
          {!editorState.isValid && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-red-600 text-white p-4 font-mono text-[11px] shadow-2xl max-w-sm border border-red-400 pointer-events-auto"
            >
              <div className="flex items-center gap-2 mb-2 font-bold uppercase tracking-widest text-[9px]">
                <AlertCircle size={14} />
                <span>Parsing Error</span>
              </div>
              <p>{editorState.errorMessage}</p>
              {editorState.line && (
                <div className="mt-2 pt-2 border-t border-red-400 flex justify-between uppercase opacity-80 text-[10px]">
                  <span>Line: {editorState.line}</span>
                  <span>Col: {editorState.column}</span>
                </div>
              )}
            </motion.div>
          )}
          {editorState.isValid && value.trim().length > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-brand-ink text-brand-bg px-4 py-2 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 border border-brand-line pointer-events-auto"
            >
              <Check size={12} className="text-green-400" />
              Valid JSON · {value.length} B
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
