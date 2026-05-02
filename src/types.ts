export interface JSONEntry {
  id: string;
  name: string;
  content: string;
  timestamp: number;
}

export interface EditorState {
  isValid: boolean;
  errorMessage: string | null;
  line: number | null;
  column: number | null;
}
