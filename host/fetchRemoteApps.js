function fetchVueApp(resolve) {
  const url = 'http://localhost:8080/remoteEntry.js'
  const script = document.createElement('script')
  script.src = url
  script.onload = () => {
    const proxy = {
      get: (request) => window.vueApp.get(request),
      init: (arg) => {
        try {
          return window.vueApp.init(arg)
        }
        catch(e) {
          console.log('remote container already initialized')
        }
      }
    }
    resolve(proxy)
  }

  script.onerror = () => {
    resolve(null)
  }

  document.head.appendChild(script)
}

function fetchReactApp(resolve) {
  const url = 'http://localhost:3030/remoteEntry.js'
  const script = document.createElement('script')
  script.src = url
  script.onload = () => {
    const proxy = {
      get: (request) => window.reactApp.get(request),
      init: (arg) => {
        try {
          return window.reactApp.init(arg)
        }
        catch(e) {
          console.log('remote container already initialized')
        }
      }
    }
    resolve(proxy)
  }

  script.onerror = () => {
    resolve(null)
  }

  document.head.appendChild(script)
}

function fetchSvelteApp(resolve) {
  const url = 'http://localhost:9091/remoteEntry.js'
  const script = document.createElement('script')
  script.src = url
  script.onload = () => {
    const proxy = {
      get: (request) => window.svelteApp.get(request),
      init: (arg) => {
        try {
          return window.svelteApp.init(arg)
        }
        catch(e) {
          console.log('remote container already initialized')
        }
      }
    }
    resolve(proxy)
  }

  script.onerror = () => {
    resolve(null)
  }

  document.head.appendChild(script)
}

module.exports = {fetchVueApp, fetchReactApp, fetchSvelteApp}