# Veloci Remover

**Veloci Remover** is a simple web-based text cleaning tool built with **Next.js** and **Tailwind CSS**, designed to remove invisible Unicode characters (e.g., zero-width spaces often found in AI-generated or copy-pasted text) and provide basic text statistics.

## 🚀 Features

- ✅ **Paste or upload** text from various file formats
- 🧼 **Remove invisible characters** such as zero-width space (`\u200B`), zero-width non-joiner (`\u200C`), and zero-width joiner (`\u200D`)
- 📊 Get statistics: character count, word count, sentence count, paragraph count, reading time, and number of removed characters
- 📋 Copy cleaned text to clipboard
- 💾 Download cleaned text as a `.txt` file
- 🧹 Clear all input/output with one click
- ☕ Support the developer via Buy Me a Coffee

## 📁 Supported File Types

You can upload any of the following text-based files:

- `.txt`, `.md`, `.json`, `.xml`, `.html`, `.css`, `.js`, `.ts`, `.py`, `.java`, `.c`, `.cpp`, `.csv`, `.log`, `.yaml`, `.yml`

## 🧱 Tech Stack

- **Framework**: React (Next.js with App Router)
- **Styling**: Tailwind CSS
- **Icons**: [Lucide](https://lucide.dev/)
- **Components**: Custom + [shadcn/ui](https://ui.shadcn.com/) based

## 📦 Installation

To run this project locally:

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/veloci-remover.git
cd veloci-remover

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

## 🧪 Usage

Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Development Notes

- To modify the invisible characters being removed, update the `invisibles` set in `TextProcessor.tsx`.
- All file uploads are processed using the **FileReader API**, and validation ensures only text-based files are accepted.
- Statistics are recalculated every time the **"Process Text"** button is clicked.

---

## 🔒 Privacy & Data

This tool does **not** store any input or output data. All processing happens **locally in the browser**.

---

## ☕ Support

If you find this tool useful, consider [buying me a coffee](https://buymeacoffee.com/circloid)!

---

## 📄 License

MIT License. © 2025 **Circloid Org**
