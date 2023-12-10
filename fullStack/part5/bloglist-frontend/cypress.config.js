import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'fdu981',
  //failOnStatusCode: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:'http://localhost:3000'
  },
  env: {
    BACKEND: 'http://localhost:3003/api',
  }
})
