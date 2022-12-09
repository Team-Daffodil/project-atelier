import React from 'react'
import FactorBar from './FactorBar'

export default {
  component: FactorBar,
  title: 'FactorBar',
}

const Template = (args) => <FactorBar {...args} />

export const Default = Template.bind({})
Default.args = {
  num: 2.5,
}
