import React from "react";
import AdviceContainer from "../components/AdviceContainer";
import PoweredByStatement from "../components/PoweredByStatement";
import advice from "./types/advice";

export default function Home(props: advice) {
    return (
        <main className={"w-full min-h-screen bg-slate-800 flex flex-col items-center justify-center px-4 pt-10 pb-16"}>
            <AdviceContainer adviceID={props.id} adviceText={props.text}/>
            <PoweredByStatement/>
        </main>
    )
}

export async function getServerSideProps() {
    let url = "https://api.adviceslip.com/advice"

    let adviceID
    let adviceText

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
            adviceID: adviceID,
            adviceText: adviceText
        }
    }
}