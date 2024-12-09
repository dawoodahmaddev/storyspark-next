"use client"

import Image from "next/image";
import { useState } from "react";
import { generateStory, generateStoryImage } from "./services/prompt-service";
import StoryResponse from "./components/story-response";

export default function Home() {

  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string[]>([]);
  const [imageURL, setImageURL] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLayoutVisible, setIsLayoutVisible] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse([]);
    setImageURL("");
    setIsLayoutVisible(true);

    try {
      const data = await generateStory(prompt);
      const imageURL = await generateStoryImage(prompt);
      console.log(data, imageURL);
      setImageURL(imageURL);
      setResponse(data);
    } catch (error) {
      console.error(error)
      setResponse(["Error generating response"]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleBack = () => {
    setIsLayoutVisible(false);
  }

  return (
    <div className="font-sans min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <header className="bg-blue-500 text-center fixed top-0 left-0 right-0 p-4 shadow-lg">
        <h1 className="text-3xl font-semibold text-white">SPARK YOUR CHILD’S IMAGINATIONS!</h1>
      </header>
      {!isLayoutVisible ? (
        <div className="bg-white w-full max-w-lg p-6 rounded-md shadow-lg border">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create Story</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="w-full p-4 text-lg border border-gray-300 rounded-md"
            placeholder="Enter your prompt here..."
            required
            disabled={isLoading}
          />
          <button
            type="submit"
            className="w-full px-6 py-3 text-lg bg-blue-600 text-white rounded-md"
            disabled={isLoading}>
            { isLoading ? "Generating..." : "Generate Story"}
          </button>
        </form>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center pt-5">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://storyspark.ai/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to storyspar.ai →
          </a>
        </footer>
      </div>

      ) : (
        <StoryResponse response={response} imageURL={imageURL} onBack={handleBack} />
      )}
      
    </div>
  );
}
