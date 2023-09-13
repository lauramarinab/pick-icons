export type Icon = {
  name: string;
  filename: string;
  urlSrc: string;
  metadata: Array<string>;
  categories: Array<string>;
};

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}
