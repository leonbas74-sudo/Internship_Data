"use client";

import Image from "next/image";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import WebsiteMetaCard from "@/components/website-meta-card";
import { Send, User, Square, Search } from "lucide-react";

export default function Home() {
  const [input, setInput] = useState("");
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    sendMessage,
    status,
    stop,
    error,
    regenerate,
  } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  // Auto-scroll while new messages or streamed content arrive
  useEffect(() => {
    chatBoxRef.current?.scrollTo({
      top: chatBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, status]);

  // Send message
  const handleSend = () => {
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      return;
    }

    sendMessage({
      parts: [
        {
          type: "text",
          text: trimmedInput,
        },
      ],
    });

    setInput("");
  };

  // Example prompt
  const handleExamplePrompt = () => {
    setInput("Find recent information about artificial intelligence and summarize it.");
  };

  // Enter key
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <main
      className="
        min-h-screen
        bg-[#020617]
        text-white
        flex
        items-center
        justify-center
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-3xl
          h-[90vh]
          rounded-3xl
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          shadow-2xl
          flex
          flex-col
          overflow-hidden
        "
      >
        {/* Header */}
        <header
          className="
            p-5
            border-b
            border-white/10
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              bg-blue-500/20
              p-2
              rounded-xl
              w-14
              h-14
              flex
              items-center
              justify-center
            "
          >
            <Image
              src="/1.png"
              width={250}
              height={250}
              alt="Leon.Ai"
            />
          </div>

          <div>
            <h1 className="font-bold text-xl">
              Leon AI Research Agent
            </h1>

            <p className="text-sm text-gray-400">
              Search • Analyze • Summarize
            </p>
          </div>
        </header>

        {/* Messages */}
        <div
          ref={chatBoxRef}
          className="
            flex-1
            overflow-y-auto
            p-6
            space-y-5
          "
        >
          {/* Empty State */}
          {messages.length === 0 && !error && (
            <div
              className="
                h-full
                flex
                flex-col
                items-center
                justify-center
                text-center
                px-6
              "
            >
              <Image
                src="/1.png"
                alt="Leon AI Bot"
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover"
              />

              <h2 className="mt-5 text-xl font-bold text-white">
                Welcome to Leon AI Research Agent
              </h2>

              <p className="mt-2 text-sm text-gray-400 max-w-md">
                Ask me a research question or give me a
                website URL. I can search the web, analyze
                webpages, and summarize useful information.
              </p>

              <button
                onClick={handleExamplePrompt}
                className="
                  mt-5
                  px-4
                  py-3
                  rounded-xl
                  bg-blue-600/20
                  border
                  border-blue-500/30
                  text-blue-300
                  text-sm
                  hover:bg-blue-600/30
                  transition
                "
              >
                Try a research question
              </button>
            </div>
          )}

          {/* Chat Error */}
          {error && (
            <div
              className="
                rounded-2xl
                border
                border-red-400/20
                bg-red-500/10
                p-4
              "
            >
              <p className="text-sm font-medium text-red-300">
                ❌ Something went wrong
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {error.message ||
                  "The AI response could not be completed."}
              </p>

              <button
                onClick={() => regenerate()}
                className="
                  mt-3
                  rounded-xl
                  bg-red-500
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-white
                  hover:bg-red-400
                  transition
                "
              >
                Retry
              </button>
            </div>
          )}

          {/* Chat Messages */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`
                flex
                gap-3
                ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }
              `}
            >
              {/* AI Avatar */}
              {message.role === "assistant" && (
                <div
                  className="
                    bg-blue-500/20
                    p-2
                    rounded-full
                    h-fit
                  "
                >
                  <Image
                    src="/1.png"
                    width={40}
                    height={40}
                    alt="Leon.Ai"
                  />
                </div>
              )}

              {/* Message Content */}
              <div
                className={`
                  max-w-[75%]
                  rounded-2xl
                  px-5
                  py-3
                  leading-relaxed
                  ${
                    message.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white/10 border border-white/10 rounded-bl-none"
                  }
                `}
              >
                {message.parts.map((part, index) => {
                  {/* Text */}
                  if (part.type === "text") {
                    return (
                      <span key={index}>
                        {part.text}
                      </span>
                    );
                  }

                  {/* Web Search Tool */}
                  if (part.type === "tool-webSearch") {
                    {/* Searching */}
                    if (
                      part.state === "input-streaming"
                    ) {
                      return (
                        <div
                          key={index}
                          className="
                            mt-3
                            rounded-2xl
                            border
                            border-purple-400/20
                            bg-purple-500/10
                            p-4
                          "
                        >
                          <div className="flex items-center gap-2">
                            <Search
                              size={18}
                              className="text-purple-300"
                            />

                            <p className="text-sm font-medium text-purple-300">
                              Preparing web search...
                            </p>
                          </div>
                        </div>
                      );
                    }

                    {/* Search Started */}
                    if (
                      part.state === "input-available"
                    ) {
                      return (
                        <div
                          key={index}
                          className="
                            mt-3
                            rounded-2xl
                            border
                            border-purple-400/20
                            bg-purple-500/10
                            p-4
                          "
                        >
                          <div className="flex items-center gap-2">
                            <Search
                              size={18}
                              className="text-purple-300"
                            />

                            <p className="text-sm font-medium text-purple-300">
                              🔍 Searching the web...
                            </p>
                          </div>

                          <p className="mt-1 text-xs text-gray-400">
                            Finding relevant information and webpages.
                          </p>
                        </div>
                      );
                    }

                    {/* Search Results */}
                    if (
                      part.state === "output-available"
                    ) {
                      const output = part.output as {
                        success: boolean;
                        query: string;
                        results: {
                          title: string;
                          url: string;
                          snippet: string;
                        }[];
                        error?: string;
                      };

                      if (!output.success) {
                        return (
                          <div
                            key={index}
                            className="
                              mt-3
                              rounded-2xl
                              border
                              border-red-400/20
                              bg-red-500/10
                              p-4
                            "
                          >
                            <p className="text-sm font-medium text-red-300">
                              ❌ Web search failed
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              {output.error ||
                                "The web search could not be completed."}
                            </p>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={index}
                          className="
                            mt-3
                            rounded-2xl
                            border
                            border-purple-400/20
                            bg-purple-500/10
                            p-4
                          "
                        >
                          <div className="flex items-center gap-2">
                            <Search
                              size={18}
                              className="text-purple-300"
                            />

                            <p className="text-sm font-medium text-purple-300">
                              🔍 Web Search Results
                            </p>
                          </div>

                          <p className="mt-1 text-xs text-gray-400">
                            Search: {output.query}
                          </p>

                          <div className="mt-3 space-y-3">
                            {output.results.map(
                              (result, resultIndex) => (
                                <a
                                  key={resultIndex}
                                  href={result.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="
                                    block
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/5
                                    p-3
                                    hover:bg-white/10
                                    transition
                                  "
                                >
                                  <p className="text-sm font-medium text-blue-300">
                                    {result.title}
                                  </p>

                                  <p className="mt-1 text-xs text-gray-400 line-clamp-2">
                                    {result.snippet}
                                  </p>

                                  <p className="mt-2 text-xs text-blue-400 truncate">
                                    {result.url}
                                  </p>
                                </a>
                              )
                            )}
                          </div>
                        </div>
                      );
                    }

                    {/* Search Error */}
                    if (
                      part.state === "output-error"
                    ) {
                      return (
                        <div
                          key={index}
                          className="
                            mt-3
                            rounded-2xl
                            border
                            border-red-400/20
                            bg-red-500/10
                            p-4
                          "
                        >
                          <p className="text-sm font-medium text-red-300">
                            ❌ Web search failed
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {part.errorText ||
                              "The web search could not be completed."}
                          </p>
                        </div>
                      );
                    }
                  }

                  {/* Website Metadata Tool */}
                  if (
                    part.type === "tool-fetchWebsiteMeta"
                  ) {
                    {/* Tool Input Streaming */}
                    if (
                      part.state === "input-streaming"
                    ) {
                      return (
                        <div
                          key={index}
                          className="
                            mt-3
                            rounded-2xl
                            border
                            border-yellow-400/20
                            bg-yellow-500/10
                            p-4
                          "
                        >
                          <p className="text-sm font-medium text-yellow-300">
                            🔄 Analyzing website...
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            Preparing the webpage for analysis.
                          </p>
                        </div>
                      );
                    }

                    {/* Tool Input Available */}
                    if (
                      part.state === "input-available"
                    ) {
                      return (
                        <div
                          key={index}
                          className="
                            mt-3
                            rounded-2xl
                            border
                            border-blue-400/20
                            bg-blue-500/10
                            p-4
                          "
                        >
                          <p className="text-sm font-medium text-blue-300">
                            🌐 Fetching webpage content...
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            The agent is retrieving information from the webpage.
                          </p>
                        </div>
                      );
                    }

                    {/* Tool Output Available */}
                    if (
                      part.state === "output-available"
                    ) {
                      const output = part.output as {
                        success: boolean;
                        url: string;
                        title: string | null;
                        description: string | null;
                        content: string | null;
                        error?: string;
                      };

                      if (!output.success) {
                        return (
                          <div
                            key={index}
                            className="
                              mt-3
                              rounded-2xl
                              border
                              border-red-400/20
                              bg-red-500/10
                              p-4
                            "
                          >
                            <p className="text-sm font-medium text-red-300">
                              ❌ Website analysis failed
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              {output.error ||
                                "The website could not be analyzed."}
                            </p>
                          </div>
                        );
                      }

                      return (
                        <WebsiteMetaCard
                          key={index}
                          url={output.url}
                          title={output.title}
                          description={output.description}
                        />
                      );
                    }

                    {/* Tool Output Error */}
                    if (
                      part.state === "output-error"
                    ) {
                      return (
                        <div
                          key={index}
                          className="
                            mt-3
                            rounded-2xl
                            border
                            border-red-400/20
                            bg-red-500/10
                            p-4
                          "
                        >
                          <p className="text-sm font-medium text-red-300">
                            ❌ Website analysis failed
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {part.errorText ||
                              "The website could not be analyzed."}
                          </p>
                        </div>
                      );
                    }
                  }

                  return null;
                })}
              </div>

              {/* User Avatar */}
              {message.role === "user" && (
                <div
                  className="
                    bg-white/10
                    p-2
                    rounded-full
                    h-fit
                  "
                >
                  <User size={18} />
                </div>
              )}
            </div>
          ))}

          {/* Thinking State */}
          {status === "submitted" && (
            <div
              className="
                flex
                gap-3
                items-center
                text-gray-400
              "
            >
              <Image
                src="/1.png"
                alt="AI Bot"
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover"
              />

              <div className="thinking">
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div
          className="
            p-5
            border-t
            border-white/10
          "
        >
          <div
            className="
              flex
              gap-3
              bg-white/5
              rounded-2xl
              p-2
              border
              border-white/10
            "
          >
            {/* Input */}
            <input
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Ask anything or research a topic..."
              aria-label="Chat message input"
              className="
                flex-1
                bg-transparent
                outline-none
                px-4
              "
            />

            {/* Stop / Send Button */}
            {status === "streaming" ? (
              <button
                onClick={stop}
                aria-label="Stop AI response"
                className="
                  bg-red-500
                  hover:bg-red-400
                  px-4
                  rounded-xl
                  transition
                "
              >
                <Square size={18} />
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                aria-label="Send message"
                className="
                  bg-blue-600
                  hover:bg-blue-500
                  px-4
                  rounded-xl
                  transition
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                  disabled:hover:bg-blue-600
                "
              >
                <Send size={18} />
              </button>
            )}
          </div>

          {/* Empty Input Helper */}
          {!input.trim() && (
            <p className="mt-2 text-center text-xs text-gray-500">
              Ask a question, research a topic, or provide a website URL.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}