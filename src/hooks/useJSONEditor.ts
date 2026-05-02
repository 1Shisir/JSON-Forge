import { useState, useCallback, useEffect } from 'react';
import { JSONEntry, EditorState } from '../types';

export function useJSONEditor() {
  const [jsonValue, setJsonValue] = useState<string>('{\n  "welcome": "to JSON Forge",\n  "features": [\n    "Syntax Highlighting",\n    "Error Checking",\n    "Code Folding",\n    "Auto-completion"\n  ]\n}');
  const [history, setHistory] = useState<JSONEntry[]>([]);
  const [editorState, setEditorState] = useState<EditorState>({
    isValid: true,
    errorMessage: null,
    line: null,
    column: null,
  });

  useEffect(() => {
    const saved = localStorage.getItem('json_forge_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load history', e);
      }
    }
  }, []);

  const validateJson = useCallback((value: string) => {
    if (!value.trim()) {
      setEditorState({ isValid: true, errorMessage: null, line: null, column: null });
      return;
    }

    try {
      JSON.parse(value);
      setEditorState({ isValid: true, errorMessage: null, line: null, column: null });
    } catch (e: any) {
      const message = e.message;
      let line = null, column = null;
      
      const match = message.match(/at line (\d+) column (\d+)/);
      if (match) {
        line = parseInt(match[1]);
        column = parseInt(match[2]);
      } else {
        const posMatch = message.match(/position (\d+)/);
        if (posMatch) {
          const pos = parseInt(posMatch[1]);
          const lines = value.substring(0, pos).split('\n');
          line = lines.length;
          column = lines[lines.length - 1].length + 1;
        }
      }

      setEditorState({
        isValid: false,
        errorMessage: message,
        line,
        column
      });
    }
  }, []);

  const saveToHistory = useCallback((content: string, name?: string) => {
    if (!content.trim() || content.length > 1000000) return;
    
    setHistory(prev => {
      if (prev.length > 0 && prev[0].content === content) return prev;
      
      const newEntry: JSONEntry = {
        id: crypto.randomUUID?.() || Math.random().toString(36).substr(2, 9),
        name: name || `Entry ${new Date().toLocaleTimeString()}`,
        content,
        timestamp: Date.now(),
      };
      
      const updated = [newEntry, ...prev.slice(0, 19)];
      
      try {
        localStorage.setItem('json_forge_history', JSON.stringify(updated));
      } catch (e) {
        console.warn('LocalStorage quota exceeded');
      }
      return updated;
    });
  }, []);

  const formatJson = useCallback(() => {
    try {
      const parsed = JSON.parse(jsonValue);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonValue(formatted);
      validateJson(formatted);
      saveToHistory(formatted, 'Formatted');
    } catch (e) {
      // Validation handles showing error
    }
  }, [jsonValue, validateJson, saveToHistory]);

  const minifyJson = useCallback(() => {
    try {
      const parsed = JSON.parse(jsonValue);
      const minified = JSON.stringify(parsed);
      setJsonValue(minified);
      validateJson(minified);
      saveToHistory(minified, 'Minified');
    } catch (e) {
      // Validation handles showing error
    }
  }, [jsonValue, validateJson, saveToHistory]);

  const setContent = useCallback((content: string) => {
    setJsonValue(content);
    validateJson(content);
  }, [validateJson]);

  const clearEditor = useCallback(() => {
    setJsonValue('');
    setEditorState({ isValid: true, errorMessage: null, line: null, column: null });
  }, []);

  const deleteHistoryItem = useCallback((id: string) => {
    setHistory(prev => {
      const updated = prev.filter(item => item.id !== id);
      try {
        localStorage.setItem('json_forge_history', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to update storage', e);
      }
      return updated;
    });
  }, []);

  return {
    jsonValue,
    history,
    editorState,
    setContent,
    formatJson,
    minifyJson,
    clearEditor,
    saveToHistory,
    deleteHistoryItem
  };
}
