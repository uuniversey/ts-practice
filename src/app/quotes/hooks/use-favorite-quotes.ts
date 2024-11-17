import { useState, useEffect } from "react"

interface QuoteProps {
  id: number
  quote: string
  author: string
}

export const useFavoriteQuotes = () => {
  const [favoriteQuotes, setFavoriteQuotes] = useState<QuoteProps[]>([])

  useEffect (() => {
    const data = localStorage.getItem('favoriteQuotes')
    if (data) {
      setFavoriteQuotes(JSON.parse(data))
    }
  }, [])

  const isFavorite = (id: number) => {
    return favoriteQuotes.some((quote) => quote.id === id)
  }

  // isFavorite이 true - 즐겨찾기를 해제해야하므로 해당 quote만 뺀 배열 만듬
  // isFavorite이 false - 즐겨찾기에 추가해야하므로 quote를 기존 배열에 추가
  const onFavorite = (quote: QuoteProps) => () => {
    const newFavorites = isFavorite(quote.id)
      ? favoriteQuotes.filter((q) => q.id !== quote.id)
      : [...favoriteQuotes, quote]

    setFavoriteQuotes(newFavorites)
    localStorage.setItem('favoriteQuotes', JSON.stringify(newFavorites))
  }

  return {
    isFavorite,
    onFavorite,
    favoriteQuotes,
  }
}
