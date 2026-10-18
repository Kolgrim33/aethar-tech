import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

export { SITE_URL, COMPANY_LINKEDIN, projects } from './site.js'

export function render() {
  return renderToString(<StrictMode><App /></StrictMode>)
}
