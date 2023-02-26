import {GrUpdate} from "react-icons/gr";

export default function RequestAdviceButton(props: {
    handleClick: () => void
}) {
    return (
        <div onClick={props.handleClick} className={"rounded-full bg-green-400 p-6 inline-block -mb-16 cursor-pointer hover:bg-green-300 shadow"}>
            <GrUpdate/>
        </div>
    )
}