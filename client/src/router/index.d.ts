import "vue-router";

declare module "vue-router" {
  interface RouterMeta {
    requiresAuth?: boolean;
  }
}
