'use client';

import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import Image from "next/image";

interface StrapiRichTextProps {
  content: BlocksContent;
  className?: string;
}

export default function StrapiRichTextRenderer({ content, className = '' }: StrapiRichTextProps) {
  if (!content) return null;

  return (
    <div className={`prose max-w-none ${className}`}>
      <BlocksRenderer
        content={content}
        blocks={{
          paragraph: ({ children }) => (
            <p className="my-4 leading-relaxed">{children}</p>
          ),
          heading: ({ children, level }) => {
            switch (level) {
              case 1:
                return <h1 className="text-4xl font-bold my-6">{children}</h1>;
              case 2:
                return <h2 className="text-3xl font-bold my-5">{children}</h2>;
              case 3:
                return <h3 className="text-2xl font-semibold my-4">{children}</h3>;
              case 4:
                return <h4 className="text-xl font-medium my-3">{children}</h4>;
              case 5:
                return <h5 className="text-lg font-medium my-2">{children}</h5>;
              case 6:
                return <h6 className="text-base font-medium my-2">{children}</h6>;
              default:
                return <h2 className="text-3xl font-bold my-5">{children}</h2>;
            }
          },
          list: ({ children, format }) => {
            if (format === 'ordered') {
              return <ol className="list-decimal pl-6 my-4">{children}</ol>;
            }
            return <ul className="list-disc pl-6 my-4">{children}</ul>;
          },
          quote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
              {children}
            </blockquote>
          ),
          code: ({ children, plainText }) => (
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-4">
              <code className="text-sm font-mono">{children}</code>
            </pre>
          ),
          image: ({ image }) => {
            // Si l'image vient de Strapi, on doit préfixer l'URL
            const imageUrl = image.url.startsWith('/')
              ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${image.url}`
              : image.url;

            // Utiliser Image de Next.js si on a les dimensions, sinon fallback sur img standard
            if (image.width && image.height) {
              return (
                <div className="my-6">
                  <Image
                    src={imageUrl}
                    width={image.width}
                    height={image.height}
                    alt={image.alternativeText || ""}
                    className="rounded-lg"
                  />
                </div>
              );
            }
            
            return (
              <div className="my-6">
                <img
                  src={imageUrl}
                  alt={image.alternativeText || ""}
                  className="rounded-lg max-w-full h-auto"
                />
              </div>
            );
          },
          link: ({ children, url }) => (
            <a href={url} className="text-blue-600 hover:underline">
              {children}
            </a>
          ),
        }}
        modifiers={{
          bold: ({ children }) => <strong className="font-bold">{children}</strong>,
          italic: ({ children }) => <em className="italic">{children}</em>,
          underline: ({ children }) => <u className="underline">{children}</u>,
          code: ({ children }) => (
            <code className="bg-gray-100 px-1.5 py-0.5 rounded-sm text-sm font-mono">
              {children}
            </code>
          ),
        }}
      />
    </div>
  );
}