import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import QUnit from "qunit";

function MyComponent({ name }) {
  return <div>Hello, {name}!</div>;
}

QUnit.module("HeroSection", function (hooks) {
  let container;

  hooks.beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  hooks.afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  QUnit.test("it renders the correct text", function (assert) {
    act(() => {
      ReactDOM.render(<MyComponent name="World" />, container);
    });

    const div = container.querySelector("div");
    assert.equal(div.textContent, "Hello, World!");
  });
});
