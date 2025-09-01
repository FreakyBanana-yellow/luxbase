// Entscheidet, wohin nach dem Login geroutet wird.
export const routeAfterLogin = (role?: string): string =>
  role === 'admin' ? '/admin' : '/dashboard';

export default routeAfterLogin;