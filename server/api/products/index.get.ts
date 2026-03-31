import { products as mockProducts } from '../../utils/mockData'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const limitQuery = query.limit ? `?limit=${query.limit}` : ''
  
  // Artificial delay to guarantee the Skeleton/Spinner loaders are visible during client-side navigation
  await new Promise(resolve => setTimeout(resolve, 800))
  
  try {
    // Attempt to fetch from the real API
    const response = await $fetch(`https://fakestoreapi.com/products${limitQuery}`)
    return response
  } catch (error) {
    // If it fails, fallback to the mock data smoothly
    console.warn("FakeStoreAPI is unreachable, falling back to mock data.", error)
    
    // Artificial delay to allow UI spinner to show
    await new Promise(resolve => setTimeout(resolve, 300))
    
    let result = mockProducts
    if (query.limit) {
      result = result.slice(0, Number(query.limit))
    }
    return result
  }
})
