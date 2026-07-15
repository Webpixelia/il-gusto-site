// components/ContentRenderer.tsx
//
// Remplace components/StrapiRichTextRenderer.tsx : rend le tableau
// `ContentSection[]` de data/pages.ts (voir types/restaurant.ts) au lieu du
// Rich Text Strapi (BlocksContent).

import type { ContentSection } from "@/types/restaurant";

// Mapping explicite plutôt que `keyof JSX.IntrinsicElements` : évite toute
// dépendance au namespace global `JSX` (supprimé par défaut avec React 19 /
// les types React récents, remplacé par `React.JSX`).
const HeadingTag = {
  2: "h2",
  3: "h3",
  4: "h4",
} as const;

export default function ContentRenderer({
  content,
  className,
}: {
  content: ContentSection[];
  className?: string;
}) {
  return (
    <div className={className}>
      {content.map((section, i) => {
        if (section.type === "heading") {
          const level = section.level ?? 2;
          switch (level) {
            case 3:
              return <h3 key={i}>{section.text}</h3>;
            case 4:
              return <h4 key={i}>{section.text}</h4>;
            default:
              return <h2 key={i}>{section.text}</h2>;
          }
        }
        if (section.type === "list") {
          return (
            <ul key={i}>
              {section.items?.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{section.text}</p>;
      })}
    </div>
  );
}