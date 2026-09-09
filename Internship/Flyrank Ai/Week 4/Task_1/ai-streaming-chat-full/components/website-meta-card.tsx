"use client";

import { Globe, ExternalLink } from "lucide-react";

type WebsiteMetaCardProps = {
  url: string;
  title: string | null;
  description: string | null;
};

export default function WebsiteMetaCard({
  url,
  title,
  description,
}: WebsiteMetaCardProps) {
  return (
    <div className="mt-3 w-full max-w-md rounded-2xl border border-blue-400/20 bg-blue-500/10 p-5 shadow-lg">
      {/* Card Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-xl bg-blue-500/20 p-3">
          <Globe size={22} className="text-blue-400" />
        </div>

        <div>
          <h3 className="font-semibold text-white">
            Website Metadata
          </h3>

          <p className="text-xs text-gray-400">
            Fetched by AI tool
          </p>
        </div>
      </div>

      {/* Website Information */}
      <div className="space-y-4">
        {/* URL */}
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
            Website
          </p>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 break-all text-sm text-blue-400 transition-colors hover:text-blue-300"
          >
            <span>{url}</span>
            <ExternalLink size={14} className="shrink-0" />
          </a>
        </div>

        {/* Title */}
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
            Title
          </p>

          <p className="text-sm text-white">
            {title || "No title found"}
          </p>
        </div>

        {/* Description */}
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
            Description
          </p>

          <p className="text-sm leading-relaxed text-gray-300">
            {description || "No description found"}
          </p>
        </div>
      </div>
    </div>
  );
}