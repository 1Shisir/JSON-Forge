import React, { useState, useCallback, useRef } from 'react';
import { useJSONEditor } from './hooks/useJSONEditor';
import { Sidebar } from './components/Sidebar';
import { Toolbar } from './components/Toolbar';
import { EditorView } from './components/EditorView';
import { JSONEntry } from './types';

export default function App() {
  const {
    jsonValue,
    history,
    editorState,
    setContent,
    formatJson,
    minifyJson,
    clearEditor,
    saveToHistory,
    deleteHistoryItem
  } = useJSONEditor();

  const [showHistory, setShowHistory] = useState(window.innerWidth >= 1024);
  const editorRef = useRef<any>(null);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(jsonValue);
  }, [jsonValue]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([jsonValue], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `forge-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [jsonValue]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/json' || file.name.endsWith('.json'))) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setContent(content);
        saveToHistory(content, file.name);
      };
      reader.readAsText(file);
    }
  }, [setContent, saveToHistory]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div 
      className="flex h-screen w-screen overflow-hidden bg-brand-bg text-brand-ink"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Sidebar 
        isVisible={showHistory}
        history={history}
        onToggle={() => setShowHistory(false)}
        onSelect={(entry: JSONEntry) => setContent(entry.content)}
        onDelete={deleteHistoryItem}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Toolbar 
          showSidebar={showHistory}
          onToggleSidebar={() => setShowHistory(true)}
          onFormat={formatJson}
          onMinify={minifyJson}
          onCopy={handleCopy}
          onDownload={handleDownload}
          onClear={clearEditor}
        />

        <EditorView 
          value={jsonValue}
          editorState={editorState}
          onChange={(val) => setContent(val || '')}
          onMount={(editor) => { editorRef.current = editor; }}
        />

        <footer className="h-8 border-t border-brand-line bg-white flex items-center justify-between px-4 text-[10px] font-mono tracking-wider italic shrink-0">
          <div className="flex items-center gap-4 opacity-50">
            <span>ENGINE: {editorRef.current ? 'MONACO ACTIVE' : 'INITIALIZING...'}</span>
            <span>Uptime: {Math.floor(performance.now() / 1000)}s</span>
          </div>
          <div className="flex items-center gap-4 opacity-50 uppercase">
            <span>Spaces: 2</span>
            <span>UTF-8</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
