import type { WebWidget } from "./WebWidgetMain";

declare global {
  interface Window  {
    webWidget: WebWidget;
  }
}

export {};