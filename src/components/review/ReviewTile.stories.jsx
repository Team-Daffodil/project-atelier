import React from 'react'
import ReviewTile from './ReviewTile'

export default {
  component: ReviewTile,
  title: 'ReviewTile',
}

const Template = (args) => <ReviewTile review={args} />

export const Default = Template.bind({})
Default.args = {
  rating: 2,
  summary:
    'This is a long review title that should exceed the maximum 60 characters',
  recommend: true,
  response: null,
  body: `Lorem ipsum dolor sit amet. Aut repellendus expedita aut velit possimus et nostrum mollitia eos explicabo omnis et quia vitae quo recusandae repudiandae hic nisi quaerat. Et dolor eveniet non reprehenderit libero 33 tempora cumque. At commodi doloremque eos quisquam Quis sed quia commodi et aliquam accusantium et quia voluptatem et quibusdam cupiditate. Et voluptatem nihil aut dolorem animi aut dignissimos illum et saepe reiciendis At accusantium explicabo in minus nesciunt eum neque inventore.

  Vel debitis recusandae eum sint voluptatem non dolores consequuntur. Eos culpa repellendus sit amet recusandae et nihil quae eum minima veniam id reiciendis sint ea voluptatem eligendi.

  Ut voluptas natus nam harum enim est molestiae possimus. Et rerum animi et voluptatem dolores aut nesciunt consequuntur. Et veniam facilis est maxime facere est nihil quia qui sequi consectetur et odit delectus qui inventore voluptatem eos quos error! Non voluptas facere aut quae dignissimos vel nihil voluptatem et ratione doloremque non enim ducimus.`,
  date: '2022-10-28T00:00:00.000Z',
  reviewerName: 'User12345',
  helpfulness: 1,
  photos: [
    {
      id: 2456642,
      url: 'http://res.cloudinary.com/dmmzqckuu/image/upload/v1666985076/zcfhcxavufcg3hijsqsc.jpg',
    },
  ],
}

export const WithResponse = Template.bind({})
WithResponse.args = {
  ...Default.args,
  response: `Attigerint ei desiderant ne repugnaret arbitrabar praesertim antedictis id. Re quaestione divisibile si eo indefinite vi. Ha attinet si minimum ut ipsemet percipi impulsu putarim. Ritas majus imo summa nempe mea longa erunt. Praeterea reliquiae aliquando fidelibus positivum usu ibi stabilire. Scripturas ad invenerunt consuetudo solutiones referuntur ii ut. Et im neutrum errores sirenas ii ac vestiri. Voce poni unam ope lus haec unum regi.
`,
}
