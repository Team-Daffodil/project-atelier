import { rest } from 'msw'
import { mockData } from '../../sampleData/reviews'

const apiUrl = process.env.API_URL

export const handlers = [
  rest.get(apiUrl + '/reviews', (req, res, ctx) => {
    const productId = req.url.searchParams.get('product_id')
    if (productId === '1') {
      return res(ctx.json(JSON.parse(mockData)))
    }
    return res(ctx.status(500))
  }),
]
