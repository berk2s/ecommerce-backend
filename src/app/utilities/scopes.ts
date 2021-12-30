export interface RouteScope {
  url: string;
  method: string;
  scopes: string[];
}

export const scopes: RouteScope[] = [
  {
    url: "/products",
    method: "GET",
    scopes: ["read:products"],
  },
  {
    url: "/products",
    method: "POST",
    scopes: ["write:products"],
  },
  {
    url: "/products/:id",
    method: "POST",
    scopes: ["update:products"],
  },
  {
    url: "/products/:id",
    method: "GET",
    scopes: ["read:products"],
  },
  {
    url: "/products/:id",
    method: "DELETE",
    scopes: ["delete:products"],
  },
];
