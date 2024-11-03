import { PaginationQueryParams } from "globals";

export function getPaginationParams(url: URL): PaginationQueryParams {
  let defaultLimit = 24;

  if (url.pathname.includes("/wallet/")) {
    defaultLimit = 24;
  } else {
    defaultLimit = 1000;
  }

  const limit = Number(url.searchParams.get("limit")) || defaultLimit;
  const page = Number(url.searchParams.get("page")) || 1;
  return { limit, page };
}
