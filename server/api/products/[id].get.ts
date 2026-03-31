import { products as mockProducts } from '../../utils/mockData'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  try {
    // Attempt to fetch real product by ID
    const response = await $fetch(`https://fakestoreapi.com/products/${id}`)
    return response
  } catch (error) {
    console.warn(`FakeStoreAPI failed for product ${id}, falling back to mock data.`, error)
    
    const product = mockProducts.find(p => p.id === Number(id))
    if (!product) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Product not found',
      })
    }
    
    return product
  }
})
