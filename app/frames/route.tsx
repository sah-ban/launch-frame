import { Button } from "frames.js/next";
import { frames } from "./frames";
// import { appURL } from "../utils";

// interface State {
//   lastFid?: string;
// }

const frameHandler = frames(async (ctx) => {
  // interface UserData {
  // fid: string;
  // }

  // let userData: UserData | null = null;

  let error: string | null = null;
  // let isLoading = false;

  // const fetchUserData = async (fid: string) => {
  //   isLoading = true;
  //   try {
  //     const airstackUrl = `${appURL()}/api/profile?userId=${encodeURIComponent(
  //       fid
  //     )}`;
  //     const airstackResponse = await fetch(airstackUrl);
  //     if (!airstackResponse.ok) {
  //       throw new Error(
  //         `Airstack HTTP error! status: ${airstackResponse.status}`
  //       );
  //     }
  //     const airstackData = await airstackResponse.json();

  //     if (
  //       airstackData.userData.Socials.Social &&
  //       airstackData.userData.Socials.Social.length > 0
  //     ) {
  //       const social = airstackData.userData.Socials.Social[0];
  //       userData = {
  //         fid: social.userId || "N/A"
  //       };
  //     } else {
  //       throw new Error("No user data found");
  //     }
  //   } catch (err) {
  //     console.error("Error fetching data:", err);
  //     error = (err as Error).message;
  //   } finally {
  //     isLoading = false;
  //   }
  // };

  const extractDomain = (url: string): string | null => {
    try {
      const parsedUrl = new URL(url);
      let domain = parsedUrl.searchParams.get("d");

      console.log("Extracted domain from URL:", domain);
      return domain;
    } catch (e) {
      console.error("Error parsing URL:", e);
      return null;
    }
  };

  let domain: string | null = null;

if (ctx.url) {
  domain = extractDomain(ctx.url.toString());
    console.log("Extracted domain in ctx from URL:", domain);
  } else {
    console.log("No ctx.url available");
  }

  // if (!fid && (ctx.state as State)?.lastFid) {
  //   fid = (ctx.state as State).lastFid ?? null;
  //   console.log("Using FID from state:", fid);
  // }

  console.log("domain=", domain);

  // const shouldFetchData =
  //   fid && (!userData || (userData as UserData).fid !== fid);

  let imgurl: string="https://wrpcd.net/cdn-cgi/imagedelivery/BXluQx4ige9GuW0Ia56BHw/ffa2b433-b752-4857-5d8d-8779d94a4200/original";



  // if (shouldFetchData && fid) {
  //   await Promise.all([fetchUserData(fid)]);
  // }
  const SplashScreen = () => (
    <div tw="flex flex-col w-full h-full bg-[#20142c] text-[#f5deb3] font-sans font-bold items-center justify-center">
<div tw="text-6xl">Launch a V2 frame from V1 frame</div>
<div tw="text-4xl">(add your frame domain in the query parameter)</div>
<div>(eg: )</div>


</div>
  );


  const ScoreScreen = () => {
    return (
      <div tw="flex flex-col w-full h-full bg-[#20142c] text-[#f5deb3] font-sans font-bold items-center justify-center">
      <div tw="text-8xl">Launch Frame</div>

      
      
      </div>
    );
  };
  const shareText = encodeURIComponent(
    `🎩 DEGEN to $1 🎩 \nvia @cashlessman.eth`
);

  const shareUrl = `https://warpcast.com/~/frames/launch?domain=${domain}`;

  const buttons = [];

  if (!domain) {
    buttons.push(

      <Button
        action="link"
        target="https://warpcast.com/cashlessman.eth"     >
       cashlessman.eth
      </Button>
    );
  } else {
   // https://warpcast.com/~/frames/launch?domain=degen-v2.vercel.app
    buttons.push(

      <Button action="link" target={shareUrl}>
      Launch Frame
      </Button>
      
    );
  }

  return {
    image: domain && !error ? <ScoreScreen /> : <SplashScreen /> ,
    buttons: buttons,
  };
});

export const GET = frameHandler;
export const POST = frameHandler;
