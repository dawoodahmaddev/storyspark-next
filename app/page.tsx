"use client"

import Image from "next/image";
import React from "react";

export default function Home() {


  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault();
    try {
      
    } catch (error) {
      
    } finally{
      
    }
  }

  return (
    <div className="font-sans min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <header className="bg-blue-500 text-center fixed top-0 left-0 right-0 p-4 shadow-lg">
        <h1 className="text-3xl font-semibold text-white">SPARK YOUR CHILD'S IMAGINATIONS!</h1>
      </header>
      <div className="bg-white w-full max-w-lg p-6 rounded-md shadow-lg border">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create Story</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            name=""
            id=""
            rows={4}
            className="w-full p-4 text-lg border border-gray-300 rounded-md"
            placeholder="Enter your prompt here..."
            required
          />
          <button
            type="submit"
            className="w-full px-6 py-3 text-lg bg-blue-600 text-white rounded-md">
              Generate Story
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
      
    </div>
  );
}
