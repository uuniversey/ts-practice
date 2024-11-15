import { type HTMLAttributes } from 'react'
import { RatingStars } from '@/components/rating-stars'

export interface ProductReviewProps extends HTMLAttributes<HTMLDivElement> {
  review: {
    rating: number
    comment: string
    reviewerName: string
    date: string
  }
}

export function ProductReview({
  review,
}: ProductReviewProps) {
  const { rating, comment, reviewerName, date } = review

  return (
    <div className="border p-4 mb-4 rounded-lg shadow-md ">
      <div className="flex items-center space-x-3">
        <div className="font-semibold text-md md:text-lg lg:text-xl">{reviewerName}</div>
        <div className="text-sm md:text-base text-gray-500">{new Date(date).toLocaleDateString()}</div>
      </div>

      <div className="mt-2">
        <RatingStars rating={rating} />
      </div>

      <div className="mt-2 text-gray-700 text-sm md:text-base lg:text-lg xl:text-xl">
        {comment}
      </div>
    </div>
  )
}
