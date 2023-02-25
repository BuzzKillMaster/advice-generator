import React, {useState} from "react";
import AdviceHeading from "./AdviceHeading";
import AdviceQuotation from "./AdviceQuotation";
import AdviceContainerDecoration from "./AdviceContainerDecoration";
import RequestAdviceButton from "./RequestAdviceButton";
import advice from "../pages/types/advice";


export default function AdviceContainer(props: {
    adviceID: number,
    adviceText: string
}) {
    const [advice, setAdvice] = useState<advice>({
        id: props.adviceID,
        text: props.adviceText
    })

    try {
        window.history.replaceState(null, "", "?id=" + advice.id)
    } catch (e) {}

    const updateAdvice = async (attempt: number = 0) => {
        if (attempt >= 3) {
            setAdvice({
                id: 500,
                text: "Unfortunately, the server seems to have encountered an error."
            })

            return
        }

        try {
            const response = await fetch("https://api.adviceslip.com/advice", { cache: "no-store" })
            const data = await response.json()

            if (data["slip"]["id"] === advice.id) {
                await updateAdvice()
                return
            }

            setAdvice({
                id: data["slip"]["id"],
                text: data["slip"]["advice"],
            })
        } catch (e) {
            await updateAdvice(attempt + 1)
        }
    }

    return (
        <div className={"bg-slate-700 shadow rounded-xl p-10 pb-6 text-white max-w-full w-[40rem] text-center"}>
            <AdviceHeading adviceID={advice.id}/>
            <AdviceQuotation quote={advice.text}/>
            <AdviceContainerDecoration/>
            <RequestAdviceButton handleClick={updateAdvice}/>
        </div>
    )
}