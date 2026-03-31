import { products as mockProducts } from '../../utils/mockData'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  // Artificial delay to guarantee the Skeleton/Spinner loaders are visible during client-side navigation
  await new Promise(resolve => setTimeout(resolve, 800))
  
  try {
    // Attempt to fetch real product by ID
    const response = await $fetch(`https://fakestoreapi.com/products/${id}`)
    return response
  } catch (error) {
    console.warn(`FakeStoreAPI failed for product ${id}, falling back to mock data.`, error)
    
    // Artificial delay to allow UI spinner to show
    await new Promise(resolve => setTimeout(resolve, 300))
    
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
