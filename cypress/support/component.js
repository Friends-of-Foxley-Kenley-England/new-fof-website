// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import global styles
// import "typeface-montserrat";
// import "typeface-merriweather";
import "../../src/normalize.css";
import "../../src/style.variables.css";
import "../../src/style.css";
import "prismjs/themes/prism.css";

// Import commands.js using ES2015 syntax:
import "./commands";

import { mount } from "cypress/react";

Cypress.Commands.add("mount", mount);

// Example use:
// cy.mount(<MyComponent />)
