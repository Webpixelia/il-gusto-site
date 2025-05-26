import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { getGoogleReviews } from "@/lib/googleReviews";
import type { GoogleReview } from '@/types/strapi';

export default async function GoogleReviews() {
    let reviews: GoogleReview[] | null = null;
    let error: Error | null = null;

    try {
        const result = await getGoogleReviews();
        reviews = result as GoogleReview[];
    } catch (err) {
        error = err instanceof Error ? err : new Error(String(err));
        console.error("Erreur lors de la récupération des avis:", err);
    }

  // Cas d'erreur de connexion
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          Nous rencontrons un problème avec les avis en direct.
        </p>
      </div>
    );
  }

  // Cas où il n'y a aucun avis
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8 w-full col-span-3">
        <p className="text-gray-500">
          Pas encore d'avis
        </p>
      </div>
    );
  }

  // Affichage normal des avis
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {reviews.map((review, index) => (
        <Card key={index} className="p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${star <= review.rating ? 'fill-current' : 'fill-none'}`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {review.relative_time_description}
            </span>
          </div>
          <blockquote className="text-gray-700 mb-4 italic">
            "{review.text}"
          </blockquote>
          <footer className="font-semibold">
            {review.author_name}
          </footer>
        </Card>
      ))}
    </div>
  );
}