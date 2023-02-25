import React from "react";
import AdviceContainer from "../components/AdviceContainer";
import PoweredByStatement from "../components/PoweredByStatement";
import Advice from "./types/Advice";

export default function Home(props: Advice) {
    return (
        <main className={"w-full min-h-screen bg-slate-800 flex flex-col items-center justify-center px-4 pt-10 pb-16"}>
            <AdviceContainer {...props}/>
            <PoweredByStatement/>
        </main>
    )
}

export async function getServerSideProps(context: { query: { id: string } }) {
    let adviceID: number | undefined = parseInt(context.query.id)
    let adviceText

    let url = "https://api.adviceslip.com/advice"

    if (adviceID) {
        url += "/" + adviceID
    }

    try {
        const response = await fetch(url, { cache: "no-store" })
        const data = await response.json()

        adviceID = data["slip"]["id"]
        adviceText = data["slip"]["advice"]
    } catch (e) {
        adviceID = 500
        adviceText = "Unfortunately, the server seems to have encountered an error."
    }

    return {
        props: {
            id: adviceID,
            text: adviceText
        }
    }
}