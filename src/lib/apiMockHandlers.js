import { rest } from 'msw'
import { mockData as mockReviewsData } from '../../sampleData/reviews'
import { mockData as mockReviewMetaData } from '../../sampleData/review_meta'

const apiUrl = process.env.API_URL

export const handlers = [
  rest.get(apiUrl + '/reviews', (req, res, ctx) => {
    const productId = req.url.searchParams.get('product_id')
    if (productId === '1') {
      return res(ctx.json(JSON.parse(mockReviewsData)))
    }
    return res(ctx.status(500))
  }),

  rest.put(apiUrl + '/reviews/:reviewId/helpful', (req, res, ctx) => {
    const { reviewId } = req.params
    if (reviewId === '0') {
      return res(ctx.status(204))
    }
    return res(ctx.status(500))
  }),

  rest.put(apiUrl + '/reviews/:reviewId/report', (req, res, ctx) => {
    const { reviewId } = req.params
    if (reviewId === '0') {
      return res(ctx.status(204))
    }
    return res(ctx.status(500))
  }),

  rest.get(process.env.API_URL + '/reviews/meta', (req, res, ctx) => {
    const productId = req.url.searchParams.get('product_id')
    if (productId === '1') {
      return res(ctx.json(JSON.parse(mockReviewMetaData)))
    }
    return res(ctx.status(301))
  }),
]
