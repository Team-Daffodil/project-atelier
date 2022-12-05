import React from 'react'

import Bar from './Bar'

export default {
  component: Bar,
  title: 'Review Bar',
}

const Template = (args) => <Bar {...args} />

export const Default = Template.bind({})
Default.args = {
  width: 50,
}
