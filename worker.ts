export default {
  async fetch(request: Request, env: { ASSETS: Fetcher }) {
    const url = new URL(request.url)

    // Try to serve the asset directly.
    let response = await env.ASSETS.fetch(request)

    // SPA fallback: if not found and path has no file extension, return index.html
    if (response.status === 404 && !url.pathname.split('/').pop()?.includes('.')) {
      response = await env.ASSETS.fetch(
        new Request(new URL('/', url).toString(), request)
      )
    }

    return response
  },
}
