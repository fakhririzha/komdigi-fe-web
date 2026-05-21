const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const appBasePath = rawBasePath === "/" ? "" : rawBasePath.replace(/\/$/, "");

export const withBasePath = (path: string): string => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return appBasePath ? `${appBasePath}${normalizedPath}` : normalizedPath;
};
