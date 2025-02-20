import { fetchMetadata } from "frames.js/next";
import { appURL } from "./utils";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { d?: string };
}) {
  const framesUrl = new URL("/frames", appURL());

  if (searchParams.d) {
    framesUrl.searchParams.set("d", searchParams.d);
    framesUrl.searchParams.set("action", "fetch");
  }

  console.log("Fetching metadata from:", framesUrl.toString());

  const castActionUrl = new URL("/api/cast-action", appURL());

  return {
    title: "@cashlessman.eth",
    description: "Frame One",
    openGraph: {
      title: "frame by @cashlessman.eth",
      description: "Frame One",
      images: [`${framesUrl.origin}/api/og`],
    },
    other: {
      ...(await fetchMetadata(framesUrl)),
      "fc:frame:cast_action:url": castActionUrl.toString(),
    },
  };
}

export default function Page() {
  return <span>return to warpcast...</span>;
}
