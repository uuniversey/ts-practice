import { ProductDetail } from '@/schemas/product'

export interface ProductInfoProps {
  product: ProductDetail
}

export function ProductInfo({ product }: ProductInfoProps) {
  // 표기하고 싶은 제품 정보 배열로 포장
  const productInfo = [
    { label: 'Category', value: product.category },
    { label: 'Price', value: `$${product.price}` },
    { label: 'Brand', value: product.brand },
    { label: 'SKU', value: product.sku },
    { label: 'Weight', value: `${product.weight}g` },
    { label: 'Dimensions', value: `W: ${product.dimensions.width}cm, H: ${product.dimensions.height}cm, D: ${product.dimensions.depth}cm` },
    { label: 'Warranty', value: product.warrantyInformation },
    { label: 'Shipping', value: product.shippingInformation },
    { label: 'Availability', value: product.availabilityStatus },
    { label: 'Return Policy', value: product.returnPolicy },
    { label: 'Minimum Order', value: product.minimumOrderQuantity },
  ]

  return (
    <div className="overflow-hidden rounded-lg shadow-md border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th colSpan={2} className="px-6 py-3 text-lg text-left bg-gray-100">
              Product Information
            </th>
          </tr>
        </thead>
        <tbody>
          {productInfo.map((info, index) => (
            <tr key={index}>
              <td className="px-6 py-4 text-gray-700 text-sm md:text-base lg:text-lg xl:text-xl">
                {info.label}
              </td>
              <td className="px-6 py-4 text-sm md:text-base lg:text-lg xl:text-xl">
                {info.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
