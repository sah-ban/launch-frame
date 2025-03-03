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

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-100 text-black">
  <div className="w-96 p-8 bg-white rounded-xl shadow-xl">
    <h2 className="text-2xl font-bold text-center text-black mb-4">
     Launch V2 frame from V1 frame<br></br>by <a href="https://warpcast.com/cashlessman.eth" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">cashlessman.eth</a>
    </h2>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fid">
          V2 frame domain (without protocol)
        </label>
        <div>
      <input
        id="url"
        type="text"
        placeholder="around-joined.vercel.app" 
        className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
      />
      <button
        id="copy-button" // Give the button an ID for the script to reference
        type="button"
        className="w-full px-4 py-2 mt-5 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Copy to Clipboard
      </button>
      {/* Inline script as a separate element */}
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            document.getElementById("copy-button").addEventListener("click", function() {
              const input = document.getElementById("url");
              if (input) {
                const textToCopy = "https://launch-frame.vercel.app/?d=" + input.value;
                navigator.clipboard.writeText(textToCopy)
                  .then(() => alert("Text copied to clipboard!"))
                  .catch(() => alert("Failed to copy text."));
              }
            });
          `,
        }}
      />
    </div>
      </div>
    </div>
  </div>
</div>
    
  );
}