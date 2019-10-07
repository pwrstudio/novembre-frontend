import App from './App.svelte'

// Sentry.init({ dsn: 'https://3ec1d72489f24257a8450b9fef408507@sentry.io/1757183' });

const app = new App({
  target: document.body,
  props: {
    name: 'world'
  }
})

export default app
