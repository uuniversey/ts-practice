'use client'

import { use } from 'react'
import { useProduct } from './hooks/use-product'
import { ProductCard } from './components/product-card'
import { ProductReview } from './components/product-review'
import { ProductInfo } from './components/product-info'

export interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params)

  const { data, isLoading, error } = useProduct(id)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    throw new Error(error.message)
  }

  // 데이터가 undefined일 가능성에 대한 타입 오류 해결
  if (!data) {
    return <div>Product detail not found</div>
  }

  return (
    <div>
      <ProductCard key={id} product={data} />
      <div className='mt-[5%]'>
        {data.reviews.map((review, index) => (
          // 고유키로 쓸만한게 없어서 인덱스를 붙여 고유키를 생성
          <ProductReview key={`${review.date}-${index}`} review={review} />
        ))}
      </div>
      <ProductInfo product={data} />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  )
}
