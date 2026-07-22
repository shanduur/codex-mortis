function normalizeBase(base: string) {
  const leadingSlash = base.startsWith("/") ? base : `/${base}`;
  return leadingSlash.endsWith("/") ? leadingSlash : `${leadingSlash}/`;
}

export function guideHref(
  pathname: string,
  base = import.meta.env.BASE_URL,
): string {
  if (!pathname.startsWith("/")) return pathname;

  const normalizedBase = normalizeBase(base);
  if (normalizedBase === "/") return pathname;
  if (pathname === "/") return normalizedBase;

  return `${normalizedBase.slice(0, -1)}${pathname}`;
}

export function guidePathname(
  browserPathname: string,
  base = import.meta.env.BASE_URL,
): string {
  const normalizedBase = normalizeBase(base);
  const withoutDocument = browserPathname.replace(/index\.html$/, "");

  if (normalizedBase === "/") return withoutDocument || "/";
  if (!withoutDocument.startsWith(normalizedBase))
    return withoutDocument || "/";

  const pathname = withoutDocument.slice(normalizedBase.length - 1);
  return pathname || "/";
}
