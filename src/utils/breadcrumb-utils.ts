export function generateBreadcrumbs(path: string) {
  const parts = path.split('/').filter(Boolean);
  return parts.map((part, index) => {
    const href = `/${parts.slice(0, index + 1).join('/')}`;
    const label = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
    return { href, label };
  });
}

