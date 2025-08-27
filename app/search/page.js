import { Suspense } from "react";
import SearchContent from "./SearchContent";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading search page...</div>}>
      <SearchContent />
    </Suspense>
  );
}
