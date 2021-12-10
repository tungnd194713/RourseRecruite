export default function (context) {
  // If the user is not authenticated
  if (!context.store.getters.isAuthenticated) {
    context.redirect('/login')
  }
}
