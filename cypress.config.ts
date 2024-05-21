import { defineConfig } from 'cypress'

export default defineConfig({
  fixturesFolder: 'cypress/fixtures',
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:8080',
  },
})
