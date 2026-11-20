import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { createBaseRewrite, getRuntimeBasePath } from "@/lib/base-path";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  const base = getRuntimeBasePath();
  return createRouter({
    routeTree,
    rewrite: base ? createBaseRewrite(base) : undefined,
    defaultErrorComponent: AppErrorComponent,
  });
}
