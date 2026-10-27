// Placeholder links in the markdown are not shown
export const hasRealLink = (link?: string) =>
  Boolean(link) && !link!.includes("portfolio-example.com");
