import { setupWorker } from 'msw'
import { handlers } from './apiMockHandlers'

export const worker = setupWorker(...handlers)
