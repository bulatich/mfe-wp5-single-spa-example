import {registerApplication, start} from 'single-spa'
import {constructApplications, constructLayoutEngine, constructRoutes} from 'single-spa-layout'
import('./index.css')

const ROUTES = {
  containerEl: '#mfe-apps-container',
  mode: 'hash',
  routes: [
    {
      type: 'route',
      path: 'vue_mfe',
      routes: [
        {
          type: 'application',
          name: 'vueApp/VueApp',
          loader: 'Vue app loading...',
        }
      ]
    },
    {
      type: 'route',
      path: '/react_mfe',
      routes: [
        {
          type: 'application',
          name: 'reactApp/ReactApp',
          loader: 'React app loading...',
        }
      ]
    },
    {
      type: 'route',
      path: '/svelte_mfe',
      routes: [
        {
          type: 'application',
          name: 'svelteApp/SvelteApp',
          loader: 'Svelte app loading...',
        }
      ]
    }
  ]
}

const appMappings = new Map()

appMappings.set('vueApp/VueApp', import('vueApp/VueApp'))
appMappings.set('reactApp/ReactApp', import('reactApp/ReactApp'))
appMappings.set('svelteApp/SvelteApp', import('svelteApp/SvelteApp'))

const routes = constructRoutes(ROUTES)

const applications = constructApplications({
  routes,
  loadApp({name}) {
    return appMappings.get(name)
  }
})

const layoutEngine = constructLayoutEngine({
  routes,
  applications,
  active: false
})

applications.forEach(registerApplication)

import('./bootstrap').then(() => {
  layoutEngine.activate()
  start()
})
