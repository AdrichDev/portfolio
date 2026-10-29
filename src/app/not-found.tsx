import { NotFoundContent } from "@/shared/ui/not-found-content";

// Static hosts serve this page without a Next.js server.
export const metadata = process.env.PORTFOLIO_STATIC_EXPORT === "1" && !process.env.NEXT_PUBLIC_SITE_URL
  ? { openGraph: { images: [] }, twitter: { images: [] } }
  : {};

export default function NotFound() {
  return <NotFoundContent />;
}
