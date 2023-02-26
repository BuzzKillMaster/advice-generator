import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
        <Head>
          <title>Advice Generator</title>
          <meta name="description" content="Advice Generator is a small, but useful application that allows you to quickly receive good, bad and silly bits of advice."/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <Component {...pageProps} />
      </>
  )
}
