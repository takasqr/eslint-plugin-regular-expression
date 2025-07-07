export default defineNuxtRouteMiddleware((to) => {
  // This middleware runs both during SSR and on client-side navigation

  // Skip if the path already ends with a slash or looks like a file (contains a dot)
  if (to.path.endsWith('/') || to.path.includes('.')) {
    return
  }

  // Redirect to the same path with a trailing slash (301 redirect)
  return navigateTo(
    {
      path: to.path + '/',
      query: to.query,
      hash: to.hash,
    },
    {
      redirectCode: 301,
    },
  )
})
