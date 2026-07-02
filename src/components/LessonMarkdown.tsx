import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Rendu du contenu écrit d'un module (markdown -> DA TROIE).
 * Composant serveur : aucun JS envoyé au client.
 */
export function LessonMarkdown({ markdown }: { markdown: string }) {
  return (
    <div className="max-w-3xl">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 className="t-display mt-12 text-3xl text-[var(--fg)] md:text-4xl">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h2 className="t-display mt-12 border-t border-[var(--rule)] pt-8 text-2xl text-[var(--fg)] md:text-3xl">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="t-display mt-8 text-xl text-[var(--fg)] md:text-2xl">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mt-5 text-base leading-relaxed text-[var(--fg-2)]">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-[var(--fg)]">{children}</strong>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--fg)] underline decoration-[var(--accent)] underline-offset-4 transition hover:text-[var(--accent)]"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="mt-5 space-y-2.5 pl-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mt-5 list-decimal space-y-2.5 pl-6 text-[var(--fg-2)] marker:font-mono marker:text-[12px] marker:text-[var(--accent)]">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="flex items-baseline gap-3 text-base leading-relaxed text-[var(--fg-2)] [ol_&]:block">
              <span
                aria-hidden="true"
                className="inline-block h-px w-3.5 flex-shrink-0 translate-y-[-3px] bg-[var(--accent)] [ol_&]:hidden"
              />
              <span className="min-w-0">{children}</span>
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mt-6 border-l-2 border-[var(--accent)] bg-[var(--bg-2)] px-6 py-4 [&_p]:mt-0 [&_p]:text-[15px]">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="mt-10 border-[var(--rule)]" />,
          code: ({ className, children }) => {
            const isBlock = Boolean(className);
            return isBlock ? (
              <code className="font-mono text-[13px] leading-relaxed">
                {children}
              </code>
            ) : (
              <code className="rounded-sm bg-[var(--fg)]/8 px-1.5 py-0.5 font-mono text-[13px] text-[var(--fg)]">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="mt-6 overflow-x-auto rounded-sm bg-[#14100c] p-5 text-[#f6ead4]">
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-[var(--rule-strong)] px-3 py-2.5 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-[var(--rule)] px-3 py-2.5 align-top text-[var(--fg-2)]">
              {children}
            </td>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
