import React, {useEffect, useState} from "react";
import AdviceHeading from "./AdviceHeading";
import AdviceQuotation from "./AdviceQuotation";
import AdviceContainerDecoration from "./AdviceContainerDecoration";
import RequestAdviceButton from "./RequestAdviceButton";
import {Router} from "next/router";


export default function AdviceContainer(props: {
    adviceID: number,
    adviceText: string
}) {
    const [adviceID, setAdviceID] = useState(props.adviceID)
    const [adviceText, setAdviceText] = useState(props.adviceText)

    try {
        window.history.replaceState(null, "", "/" + adviceID)
    } catch (e) {}

    const updateAdvice = async (attempt: number = 0) => {
        if (attempt >= 3) {
            setAdviceID(500)
            setAdviceText("Unfortunately, the server seems to have encountered an error.")
            return
        }

        try {
            const response = await fetch("https://api.adviceslip.com/advice", { cache: "no-store" })
            const data = await response.json()

            if (data["slip"]["id"] === adviceID) {
                await updateAdvice()
                return
            }

            setAdviceID(data["slip"]["id"])
            setAdviceText(data["slip"]["advice"])
        } catch (e) {
            await updateAdvice(attempt + 1)
        }
    }

    return (
        <div className={"bg-slate-700 shadow rounded-xl p-10 pb-6 text-white max-w-full w-[40rem] text-center"}>
            <AdviceHeading adviceID={adviceID}/>
            <AdviceQuotation quote={adviceText}/>
            <AdviceContainerDecoration/>
            <RequestAdviceButton handleClick={() => updateAdvice()}/>
        </div>
    )
}