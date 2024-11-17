'use client'

import { useInfiniteQuotes } from '@/app/quotes/hooks/use-infinite-quotes'
import { QuoteCard } from '@/app/quotes/components/quote-card'
import { useEffect, useState } from 'react'

export default function QuotesPage() {
  const { data, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuotes()
  const [ isScrolling, setIsScrolling ] = useState(false)

  // 1. 스크롤이 60% 지나면
  // 2. hasNextPage의 bool 값 판별
  // 3. true라면 fetchNExtPage 실행. 다음 데이터 호출 
  useEffect(() => {
    const handleScroll = async () => {
      const windowHeight = window.innerHeight // 화면에 보이는 높이
      const wholeHeight = document.documentElement.scrollHeight // 전체 높이
      const scrollHeight = window.scrollY // 현재 스크롤 위치

      // 처리 중, 다음 페이지 로딩 중, 더 이상 불러올 quote가 없으면 중단
      if (isScrolling || isFetchingNextPage || !hasNextPage) return

      if ((scrollHeight / (wholeHeight - windowHeight)) > 0.6) {
        setIsScrolling(true)
        await fetchNextPage()
        setIsScrolling(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [hasNextPage, fetchNextPage, isScrolling, isFetchingNextPage])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!data) {
    return <div>No quotes found</div>
  }

  return (
    <div>
      {data.pages.map((page) => 
        page.data.quotes.map((quote) =>
          <QuoteCard
            key={quote.id}
            quote={quote.quote}
            author={quote.author}
            isFavorite={false}
            onFavorite={() => {
              console.log('Clicked on favorite')
            }}
          />)
      )}
    </div>
  )
}