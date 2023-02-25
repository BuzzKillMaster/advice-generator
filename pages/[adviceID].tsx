import React from "react";
import AdviceContainer from "../components/AdviceContainer";
import PoweredByStatement from "../components/PoweredByStatement";

export default function Home(props: {
    adviceID: number,
    adviceText: string
}) {
    return (
        <main className={"w-full min-h-screen bg-slate-800 flex flex-col items-center justify-center px-4 pt-10 pb-16"}>
            <AdviceContainer adviceID={props.adviceID} adviceText={props.adviceText}/>
            <PoweredByStatement/>
        </main>
    )
}

export async function getServerSideProps(context: any) {
    let adviceID = context.query.adviceID

    let url = "https://api.adviceslip.com/advice"
    let adviceText

    if (!isNaN(parseInt(adviceID))) {
        url += "/" + adviceID
    }

    try {
        const response = await fetch(url, { cache: "no-store" })
        const data = await response.json()

        adviceID = data["slip"]["id"]
        adviceText = data["slip"]["advice"]
    } catch (e) {
        adviceID = 404
        adviceText = "The advice you were looking for could not be found."
    }

    return {
        props: {
            adviceID: adviceID,
            adviceText: adviceText
        }
    }
}