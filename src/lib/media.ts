/** Public R2 media host (nickymyny-media). Custom domain later when R2 on zone account. */
export const MEDIA_BASE =
  "https://pub-50ab45c4f2c5479c9432ad8d78e7e2f6.r2.dev";

export function mediaUrl(key: string): string {
  return `${MEDIA_BASE}/${key.replace(/^\//, "")}`;
}
