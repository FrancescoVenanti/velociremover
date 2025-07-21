"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Copy,
  FileText,
  Type,
  Coffee,
  Download,
  Upload,
  X,
  Delete,
  Github,
} from "lucide-react";

export default function TextProcessor() {
  const [inputText, setInputText] = useState("");
  const [processedText, setProcessedText] = useState("");
  const [stats, setStats] = useState({
    characters: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    diff: 0,
  });
  const [uploadedFileName, setUploadedFileName] = useState("");

  const processText = () => {
    if (!inputText.trim()) {
      setProcessedText("");
      setStats({
        characters: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        diff: 0,
      });
      return;
    }

    const invisibles = new Set(["\u200B", "\u200C", "\u200D"]);

    // Split the string into Unicode characters

    // Filter out invisibles
    const filtered = inputText.split("").filter((c) => !invisibles.has(c));

    setProcessedText(filtered.join(""));

    // Calculate statistics
    const characters = inputText.length;
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    const sentences = inputText
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 0).length;
    const paragraphs = inputText
      .split(/\n\s*\n/)
      .filter((p) => p.trim().length > 0).length;
    const readingTime = Math.ceil(words / 200); // Average reading speed
    const diff = inputText.length - filtered.length;

    setStats({ characters, words, sentences, paragraphs, readingTime, diff });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(processedText);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const clearAll = () => {
    setInputText("");
    setProcessedText("");
    setStats({
      characters: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      readingTime: 0,
      diff: 0,
    });
  };

  const downloadTextFile = () => {
    if (!processedText) return;

    const element = document.createElement("a");
    const file = new Blob([processedText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "processed-text.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is text-based (non-binary)
    const textFileTypes = [
      "text/plain",
      "text/csv",
      "text/html",
      "text/css",
      "text/javascript",
      "application/json",
      "application/xml",
      "text/xml",
      "text/markdown",
      "application/javascript",
      "text/x-python",
      "text/x-java-source",
      "text/x-c",
      "text/x-c++",
    ];

    const isTextFile =
      textFileTypes.includes(file.type) ||
      file.name.match(
        /\.(txt|md|json|xml|html|css|js|ts|py|java|c|cpp|csv|log|yaml|yml)$/i
      );

    if (!isTextFile) {
      alert(
        "Please upload a text-based file (txt, md, json, xml, html, css, js, py, etc.)"
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setInputText(content);
      setUploadedFileName(file.name);
    };
    reader.readAsText(file);
  };

  const clearUploadedFile = () => {
    setUploadedFileName("");
    setInputText("");
    setProcessedText("");
    setStats({
      characters: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      readingTime: 0,
      diff: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            VelociRemover
          </h1>
          <p className="text-gray-600">
            Paste your text and get it cleaned from AI garbage
          </p>
        </div>

        {/* Stats Bar */}
        {(inputText || processedText) && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">
                    {stats.characters} Characters
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">
                    {stats.words} Words
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Delete className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium">
                    {stats.diff} Removed
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Input Text
              </CardTitle>
              <CardDescription>
                Paste or type your text here to process it
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* File Upload Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".txt,.md,.json,.xml,.html,.css,.js,.ts,.py,.java,.c,.cpp,.csv,.log,.yaml,.yml"
                  />
                  <Button
                    variant="outline"
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                    className="flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload File
                  </Button>
                  {uploadedFileName && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-sm">
                      <FileText className="w-4 h-4" />
                      <span>{uploadedFileName}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearUploadedFile}
                        className="h-auto p-0 text-blue-700 hover:text-blue-900"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  Supported formats: TXT, MD, JSON, XML, HTML, CSS, JS, TS, PY,
                  JAVA, C, CPP, CSV, LOG, YAML
                </p>
              </div>

              <Textarea
                placeholder="Paste your text here or upload a file..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[300px] resize-none"
              />
              <div className="flex gap-2">
                <Button onClick={processText} className="flex-1">
                  Process Text
                </Button>
                <Button variant="outline" onClick={clearAll}>
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Processed Text
                </div>
                {processedText && (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={downloadTextFile}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardTitle>
              <CardDescription>
                Your cleaned and processed text will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {processedText ? (
                <div className="min-h-[300px] p-4 bg-gray-50 rounded-md border">
                  <pre className="whitespace-pre-wrap text-sm text-gray-900 font-mono">
                    {processedText}
                  </pre>
                </div>
              ) : (
                <div className="min-h-[300px] flex items-center justify-center text-gray-500 bg-gray-50 rounded-md border border-dashed">
                  <div className="text-center">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Processed text will appear here</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Enter some text and click "Process Text"
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 space-y-4">
          <div className="flex justify-center gap-3">
            <Button
              variant="outline"
              className="bg-yellow-50 hover:bg-yellow-100 border-yellow-200 text-yellow-800"
              onClick={() =>
                window.open("https://buymeacoffee.com/circloid", "_blank")
              }
            >
              <Coffee className="w-4 h-4 mr-2" />
              Buy me a coffee
            </Button>
            {/* <Button
              variant="default"
              className=""
              size={"icon"}
              onClick={() =>
                window.open("https://buymeacoffee.com/circloid", "_blank")
              }
            >
              <Github className="" />
            </Button> */}
          </div>
          <p className="text-sm text-gray-500">
            Simple text cleaning tool - remove AI whitespaces and sizeless
            character from your papers. <br /> All right reserved to{" "}
            <strong>Circloid Org</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
