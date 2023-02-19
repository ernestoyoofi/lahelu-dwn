import Script from "next/script"

export default function Head() {
  return (
    <>
      <title>Lahelu Downloader - Download foto dan video meme</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Download video atau foto meme lahelu disini !" />
      <link rel="icon" href="/favicon.ico" />
      <Script src="https://restapi-backend.vercel.app/__cdn/always-view.js"></Script>
    </>
  )
}
