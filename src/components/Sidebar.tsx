import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PanelLeft, Clock, History, Trash2 } from 'lucide-react';
import { JSONEntry } from '../types';

interface SidebarProps {
  isVisible: boolean;
  history: JSONEntry[];
  onToggle: () => void;
  onSelect: (entry: JSONEntry) => void;
  onDelete: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isVisible, 
  history, 
  onToggle, 
  onSelect, 
  onDelete 
}) => {
  return (
    <AnimatePresence initial={false}>
      {isVisible && (
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 320, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          className="h-full border-r border-brand-line flex flex-col bg-white overflow-hidden shrink-0"
        >
          <div className="p-4 border-b border-brand-line flex items-center justify-between">
            <div className="flex items-center gap-2 font-medium italic lowercase font-serif text-sm opacity-60">
              <Clock size={14} />
              <span>Session History</span>
            </div>
            <button 
              onClick={onToggle}
              className="p-1 hover:bg-brand-ink hover:text-brand-bg transition-colors"
              title="Hide History"
            >
              <PanelLeft size={16} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {history.length === 0 ? (
              <div className="p-8 text-center opacity-40">
                <History size={32} className="mx-auto mb-2 opacity-20" />
                <p className="text-xs uppercase tracking-widest font-mono">No Items Saved</p>
              </div>
            ) : (
              <div className="divide-y divide-brand-line">
                {history.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => onSelect(item)}
                    className="group p-4 hover:bg-brand-ink hover:text-brand-bg transition-all cursor-pointer relative"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-mono truncate max-w-[200px]">{item.name}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(item.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-opacity"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <div className="text-[10px] opacity-60 font-mono">
                      {new Date(item.timestamp).toLocaleTimeString()} · {item.content.length} B
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
