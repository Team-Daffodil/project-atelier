import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ReviewTile from './ReviewTile'

const reviewData = {
  rating: 2,
  summary:
    'This is a long review title that should exceed the maximum 60 characters',
  recommend: true,
  response: null,
  body: `Lorem ipsum dolor sit amet. Aut repellendus expedita aut velit possimus et nostrum mollitia eos explicabo omnis et quia vitae quo recusandae repudiandae hic nisi quaerat. Et dolor eveniet non reprehenderit libero 33 tempora cumque. At commodi doloremque eos quisquam Quis sed quia commodi et aliquam accusantium et quia voluptatem et quibusdam cupiditate. Et voluptatem nihil aut dolorem animi aut dignissimos illum et saepe reiciendis At accusantium explicabo in minus nesciunt eum neque inventore.

  Vel debitis recusandae eum sint voluptatem non dolores consequuntur. Eos culpa repellendus sit amet recusandae et nihil quae eum minima veniam id reiciendis sint ea voluptatem eligendi.

  Ut voluptas natus nam harum enim est molestiae possimus. Et rerum animi et voluptatem dolores aut nesciunt consequuntur. Et veniam facilis est maxime facere est nihil quia qui sequi consectetur et odit delectus qui inventore voluptatem eos quos error! Non voluptas facere aut quae dignissimos vel nihil voluptatem et ratione doloremque non enim ducimus.`,
  date: '2022-10-28T00:00:00.000Z',
  reviewerName: 'Brian123',
  helpfulness: 1,
  photos: [
    {
      id: 2456642,
      url: 'http://res.cloudinary.com/dmmzqckuu/image/upload/v1666985076/zcfhcxavufcg3hijsqsc.jpg',
    },
  ],
}

test('loads and renders ReviewTile', () => {
  render(<ReviewTile review={reviewData} />)
  expect(screen.getByText('Stars: 2')).toBeVisible()
  expect(screen.getByText('(1)')).toBeVisible()
})
