const withImages = require('next-images')
const withPlugins = require('next-compose-plugins');
require('dotenv').config()

module.exports = withPlugins([
    [withImages()]
],{
    env: {
        REACT_APP_CHEC_PUBLIC_KEY : process.env.REACT_APP_CHEC_PUBLIC_KEY,
        REACT_APP_STRIPE_PUBLIC_API_KEY : process.env.REACT_APP_STRIPE_PUBLIC_API_KEY,
        REACT_APP_AUTH0_DOMAIN : process.env.REACT_APP_AUTH0_DOMAIN,
        REACT_APP_AUTH0_CLIENT_ID : process.env.REACT_APP_AUTH0_CLIENT_ID,
        REACT_APP_AUTH0_CLIENT_ID2 : process.env.REACT_APP_AUTH0_CLIENT_ID2,
        APOLLO_KEY : process.env.APOLLO_KEY,
        APOLLO_GRAPH_VARIANT : process.env.APOLLO_GRAPH_VARIANT,
        APOLLO_SCHEMA_REPORTING : process.env.APOLLO_SCHEMA_REPORTING,
        REACT_APP_AUTH0_AUDIENCE: process.env.REACT_APP_AUTH0_AUDIENCE,
        WEBSITE_URL: process.env.WEBSITE_URL,
        BACKEND_SERVER: process.env.BACKEND_SERVER,
        GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
        GOOGLE_CLOUD_PUBLIC_URL: process.env.GOOGLE_CLOUD_PUBLIC_URL,
    },
    images: {
        domains:['cdn.chec.io', 'storage.googleapis.com']
    }
  });