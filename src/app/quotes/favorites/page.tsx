'use client'
import { useFavoriteQuotes } from '@/app/quotes/hooks/use-favorite-quotes'
import { QuoteCard } from '@/app/quotes/components/quote-card'

export default function FavoriteQuotesPage() {
  const { favoriteQuotes, isFavorite, onFavorite } = useFavoriteQuotes()

  return (
    <div>
      <h1
        className={'mb-4 text-3xl font-bold italic text-secondary-foreground'}
      >
        My Favorite
      </h1>
      <ul>
        {favoriteQuotes.map((quote) => (
          <QuoteCard
            key={quote.id}
            quote={quote.quote}
            author={quote.author}
            isFavorite={isFavorite(quote.id)}
            onFavorite={onFavorite(quote)}
          />
        ))}
      </ul>
    </div>
  )
}
