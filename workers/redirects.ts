const AMP_PREFIX = /^\/amp(?=\/|$)/;

export const ampRedirectPath = (pathname: string): string | null => {
  if (!AMP_PREFIX.test(pathname)) {
    return null;
  }

  const canonicalPath = pathname
    .replace(AMP_PREFIX, "")
    .replace(/\/{2,}/g, "/")
    .replace(/\/$/, "");

  return canonicalPath === "" ? "/" : canonicalPath;
};
