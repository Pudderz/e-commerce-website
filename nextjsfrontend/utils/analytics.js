import ReactGA from 'react-ga'
export const GA_TRACKING_ID = process.env.GOOGLE_ANALTICS_UA_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

export const initGA = () => {
    console.log('GA init')
    ReactGA.initialize(process.env.GOOGLE_ANALTICS_UA_ID)
  }

export const logPageView = () => {
    console.log(`Logging pageview for ${window.location.pathname}`)
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
  }
  export const logEvent = (category = '', action = '') => {
    if (category && action) {
      ReactGA.event({ category, action })
    }
  }
  export const logException = (description = '', fatal = false) => {
    if (description) {
      ReactGA.exception({ description, fatal })
    }
  }