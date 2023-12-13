import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import singleSpaReact from 'single-spa-react'

const appLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App
})

export const {bootstrap} = appLifecycles
export const {mount} = appLifecycles
export const {unmount} = appLifecycles