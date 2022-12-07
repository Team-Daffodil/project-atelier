if (typeof global.process === 'undefined') {
  const { worker } = require('../src/lib/apiMock')
  worker.start()
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
