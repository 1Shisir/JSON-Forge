# JSON Forge

A high-performance, developer-friendly JSON formatter and validator built with a focus on speed, precision, and a clean technical aesthetic.

![JSON Forge Screenshot](https://raw.githubusercontent.com/lucide-react/lucide/main/icons/braces.svg)

## ✨ Features

- **Advanced Editing**: Powered by the Monaco Editor (the heart of VS Code).
- **Syntax Highlighting**: Beautiful, high-contrast theme for better readability.
- **Real-time Validation**: Instant error checking with precise line and column indicators.
- **Code Folding**: Easily collapse large JSON objects and arrays.
- **Auto-completion**: Smart suggestions for JSON structure.
- **Session History**: Automatically saves your recent work locally (up to 20 entries).
- **One-Click Actions**:
  - **Format**: Beautifully prettify your JSON with 2-space indentation.
  - **Minify**: Compact your JSON for production use.
  - **Copy**: Instant clipboard access.
  - **Download**: Save your work as a `.json` file.
- **File Support**: Drag and drop `.json` files directly into the editor.
- **Privacy Conscious**: All processing happens client-side. Your data never leaves your browser.

## 🛠 Tech Stack

- **Framework**: [React 19](https://reactjs.org/)
- **Editor**: [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/json-forge.git
   cd json-forge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 📜 Development Notes

The project is structured for modularity and maintainability:
- `/src/components`: Reusable UI components (Sidebar, Toolbar, Editor).
- `/src/hooks`: Custom logic extraction (`useJSONEditor`).
- `/src/types.ts`: Centralized TypeScript interfaces.
- `/src/index.css`: Custom Tailwind 4 theme configuration.

## 🔒 Security

- **Strict Validation**: All JSON parsing is wrapped in safety guards.
- **XSS Prevention**: No `dangerouslySetInnerHTML` or `eval()` used.
- **Local Storage Safety**: History is strictly limited in size to prevent quota exhaustion and browser lag.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
