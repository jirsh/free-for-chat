import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head></Head>
      <body className="bg-slate-800 text-white select-none">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
