import React from 'react'
import Bio from './bio'

describe('<Bio />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Bio />)
  })
})