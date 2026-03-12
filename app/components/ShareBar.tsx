"use client";

import { useState } from "react";

export function ShareBar({ title, url }: { title: string; url: string }) {
  const reddit = `https://www.reddit.com/submit?url=${encodeURIComponent(
    url
  )}&title=${encodeURIComponent(title)}`;

  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}`;

  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mt-10 border-t border-[var(--separator)] pt-6">
      <div className="flex items-center space-x-4 text-[var(--fg-muted)]">
        <span className="uppercase tracking-widest text-xs">Share</span>

        {/* Reddit */}
        <a
          href={reddit}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-400 transition-colors"
          aria-label="Share on Reddit"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.82.45-2.37 1.14-1.48-.96-3.44-1.57-5.63-1.65l1.14-5.37 3.72.78c0 1.2.99 2.19 2.19 2.19 1.2 0 2.19-.99 2.19-2.19s-.99-2.19-2.19-2.19c-.87 0-1.62.51-1.96 1.23l-4.26-.9c-.24-.06-.48.09-.54.33l-1.26 5.94c-2.28.06-4.32.69-5.85 1.71C4.82 8.95 3.96 8.5 3 8.5c-1.65 0-3 1.35-3 3 0 1.23.75 2.28 1.8 2.73-.03.27-.06.54-.06.81 0 3.87 4.5 7 10.05 7s10.05-3.13 10.05-7c0-.27-.03-.54-.06-.81 1.05-.45 1.8-1.5 1.8-2.73z" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-.9 1.8-2.2 3.9-2.2 4.2 0 5 2.8 5 6.5V24h-4v-7.5c0-1.8 0-4.1-2.5-4.1s-2.9 2-2.9 4V24h-4V8z" />
          </svg>
        </a>

        {/* Copy link */}
        <button
          onClick={copyLink}
          className="hover:text-[var(--fg)] transition-colors"
          aria-label="Copy link"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 2a2 2 0 00-2 2v2h2V4h8v8h-2v2h2a2 2 0 002-2V4a2 2 0 00-2-2H8z" />
            <path d="M4 6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-8a2 2 0 00-2-2H4zm0 2h8v8H4V8z" />
          </svg>
        </button>

        {copied && (
          <span className="text-green-400 text-xs">Copied!</span>
        )}
      </div>
    </div>
  );
}
