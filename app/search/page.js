import { Suspense } from "react";
import SearchContent from "./SearchContent.client";

export const dynamic = "force-dynamic";
export const dynamicParams = true;


export default function Page() {
  return (
    <Suspense fallback={<div>Loading search page...</div>}>
      <SearchContent />
    </Suspense>
  );
}
