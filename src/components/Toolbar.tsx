import React, { useState } from 'react';
import { 
  PanelLeft, 
  Braces, 
  FileJson, 
  Code2, 
  Copy, 
  Check, 
  Download, 
  Trash2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ToolbarProps {
  showSidebar: boolean;
  onToggleSidebar: () => void;
  onFormat: () => void;
  onMinify: () => void;
  onCopy: () => void;
  onDownload: () => void;
  onClear: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  showSidebar,
  onToggleSidebar,
  onFormat,
  onMinify,
  onCopy,
  onDownload,
  onClear
}) => {
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

  const handleCopy = () => {
    onCopy();
    setShowCopyFeedback(true);
    setTimeout(() => setShowCopyFeedback(false), 2000);
  };

  return (
    <header className="h-14 border-b border-brand-line flex items-center justify-between px-4 bg-white z-10 shrink-0">
      <div className="flex items-center gap-4">
        {!showSidebar && (
          <button 
            onClick={onToggleSidebar}
            className="p-2 hover:bg-brand-bg border border-brand-line transition-colors"
          >
            <PanelLeft size={18} />
          </button>
        )}
        <div className="flex items-center gap-2">
          <div className="bg-brand-ink text-brand-bg p-1.5 rounded-sm">
            <Braces size={18} />
          </div>
          <h1 className="font-serif italic font-bold text-lg tracking-tight">JSON Forge</h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={onFormat}
          className="px-4 py-2 bg-white border border-brand-line flex items-center gap-2 text-xs font-mono hover:bg-brand-ink hover:text-brand-bg transition-all"
        >
          <FileJson size={14} />
          FORMAT
        </button>
        <button 
          onClick={onMinify}
          className="px-4 py-2 bg-white border border-brand-line flex items-center gap-2 text-xs font-mono hover:bg-brand-ink hover:text-brand-bg transition-all"
        >
          <Code2 size={14} />
          MINIFY
        </button>
        <div className="w-[1px] h-6 bg-brand-line opacity-20 mx-1" />
        <button 
          onClick={handleCopy}
          className="px-4 py-2 bg-white border border-brand-line flex items-center gap-2 text-xs font-mono hover:bg-brand-ink hover:text-brand-bg transition-all relative min-w-[80px]"
        >
          <AnimatePresence mode="wait">
            {showCopyFeedback ? (
              <motion.div 
                key="check"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute inset-0 flex items-center justify-center bg-brand-ink text-brand-bg"
              >
                <Check size={14} />
              </motion.div>
            ) : (
              <motion.div 
                key="copy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <Copy size={14} />
                COPY
              </motion.div>
            )}
          </AnimatePresence>
        </button>
        <button 
          onClick={onDownload}
          className="px-4 py-2 bg-white border border-brand-line flex items-center gap-2 text-xs font-mono hover:bg-brand-ink hover:text-brand-bg transition-all"
        >
          <Download size={14} />
          DOWNLOAD
        </button>
        <button 
          onClick={onClear}
          className="p-2 hover:bg-red-50 text-red-600 transition-colors"
          title="Clear Editor"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </header>
  );
};
