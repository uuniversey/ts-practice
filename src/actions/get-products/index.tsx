'use server'

import {
  GetProductsResponse,
  getProductsResponseSchema,
} from '@/schemas/product'
import { ActionResult } from '@/actions/action-result'

export interface GetProductsProps {
  skip: number
  limit: number
  q?: string
}

export const getProducts = async ({
  skip,
  limit,
  q,
}: GetProductsProps): Promise<ActionResult<GetProductsResponse>> => {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
      skip: skip.toString(),
      select: 'id,title,price,rating,stock,tags,discountPercentage,thumbnail',
    })

    if (q) {
      params.append('q', q)
    }

    const baseUrl = q
      ? 'https://dummyjson.com/products/search'
      : 'https://dummyjson.com/products'

    const url = `${baseUrl}?${params.toString()}`
    const response = await fetch(url)

    if (!response.ok) {
      return {
        status: 'error',
        error: '데이터를 가져오는데 실패했습니다.',
      }
    }

    const result = await response.json()

    const { success, data } = getProductsResponseSchema.safeParse(result)

    if (success) {
      // 추가한 항목
      // 1. q(쿼리데이터 즉 검색어)가 존재할 경우에만
      // 2. title에서 사용자가 검색한 q가 포함된 항목만 필터링
      // 3. 대소문자를 구분할 필요가 없도록 toLowerCase 사용
      // 4. 검색어가 없을 경우 모든 데이터 그대로 반환
      const titleFiltered = q
        ? data.products.filter((product) => 
            product.title.toLowerCase().includes(q.toLowerCase())
          ) 
        : data.products

      return {
        status: 'success',
        data: {
          ...data,
          products:titleFiltered
        },
      }
    } else {
      return {
        status: 'error',
        error: '데이터 형식이 올바르지 않습니다.',
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        status: 'error',
        error: err.message,
      }
    }
    return {
      status: 'error',
      error: '알 수 없는 오류가 발생했습니다.',
    }
  }
}
