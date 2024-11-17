import { useInfiniteQuery } from '@tanstack/react-query'
import { getQuotes } from '@/actions/get-quotes'

export const useInfiniteQuotes = () => {
  return useInfiniteQuery({
    queryKey: ['quotes'],
    queryFn: async ({ pageParam }) => {
      const res = await getQuotes({ skip: pageParam, limit: 20 })

      if (res.status === 'error') {
        throw new Error(res.error)
      }

      return {
        data: res.data,
        nextCursor: pageParam + 20,
      }
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  })
}
