// components/layout/FaqSection.tsx
import type { FaqItem } from "@/types/restaurant";

export default function FaqSection({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {faqs.map((faq) => (
        <div key={faq.id} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
          <p className="text-gray-700 whitespace-pre-line">{faq.reponse}</p>
        </div>
      ))}
    </div>
  );
}
