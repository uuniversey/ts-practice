import { type HTMLAttributes } from 'react'
import { ProductListItem } from '@/schemas/product'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { RatingStars } from '@/components/rating-stars'

export interface ProductCardProps {
  product: ProductListItem
}

export function ProductCard({
  className,
  product,
  ...props
}: ProductCardProps & HTMLAttributes<HTMLDivElement>) {
  const {
    id,
    price,
    rating,
    tags,
    stock,
    title,
    thumbnail,
    discountPercentage,
  } = product

  return (
    <main className={cn(className)} {...props}>
      <figure className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* 이미지 영역 */}
        <div className="overflow-hidden rounded-xl">
          <Image
            className="w-full transition-transform hover:scale-110"
            src={thumbnail}
            key={id}
            alt={title}
            layout="responsive"
            width={600}
            height={600}
          />
        </div>

        {/* 내용 영역 */}
        <div className="py-[10%] space-y-2 md:space-y-6 text-sm md:text-lg lg:text-xl xl:text-2xl">
          <h3 className="font-semibold">{title}</h3>

          <div className="flex flex-wrap items-center gap-1">
            {tags.map((tag) => (
              <Badge key={tag} className="text-sm md:text-base lg:text-lg xl:text-xl">{tag}</Badge>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Badge
              variant={'destructive'}
              className="text-xs md:text-sm lg:text-base xl:text-lg text-red-500 font-bold"
            >
              {discountPercentage}% Sale
            </Badge>

            <p className="font-semibold">{price}$</p>
          </div>

          <div className="text-xs md:text-sm lg:text-base xl:text-lg">
            <RatingStars rating={rating} />
          </div>

          <p className="italic text-gray-500">Only {stock} remains</p>
        </div>
      </figure>
    </main>
  )
}
