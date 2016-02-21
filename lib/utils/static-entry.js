import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import createRoutes from 'create-routes'
import HTML from 'html'
import app from 'app'
import { pages, config } from 'config'
import { link } from '../isomorphic/gatsby-helpers'

let routes
app.loadContext((pagesReq) => {
  routes = createRoutes(pages, pagesReq)
})

module.exports = (locals, callback) => {
  match({ routes, location: link(locals.path) }, (error, redirectLocation, renderProps) => {
    const body = renderToString(<RouterContext {...renderProps}/>)
    const html = `<!DOCTYPE html>\n ${renderToStaticMarkup(
        <HTML config={config} body={body} {...renderProps} />
    )}`

    callback(null, html)
  })
}