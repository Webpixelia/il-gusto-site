// components/layout/FaqSection.tsx
import type { FaqItem } from '@/types/strapi';

export default function FaqSection({ faqs }: { faqs: FaqItem[] }) {
    // Fonction pour convertir le Rich Text en texte simple
    const parseRichText = (content: FaqItem['reponse']) => {
      return content
        .map(item => 
          item.children.map(child => child.text).join('')
        )
        .join('\n');
    };
  
    return (
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {parseRichText(faq.reponse)}
            </p>
          </div>
        ))}
      </div>
    );
}