import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:text-slate-900 dark:prose-headings:text-slate-100 prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-a:text-accent-600 dark:prose-a:text-accent-400 prose-code:text-accent-600 dark:prose-code:text-accent-400 prose-pre:bg-gray-100 dark:prose-pre:bg-charcoal-950 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-charcoal-800">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          code({node, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
              <code className={className} {...props}>
                {children}
              </code>
            ) : (
              <code className="bg-gray-100 dark:bg-charcoal-800 text-accent-600 dark:text-accent-400 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-200 dark:border-charcoal-700" {...props}>
                {children}
              </code>
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
