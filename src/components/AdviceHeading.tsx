export default function AdviceHeading(props: {
    adviceID: number
}) {
    const handleClick = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("URL copied to clipboard")
    }

    return (
        <h1 onClick={handleClick} className={"text-green-400 font-bold mb-8 inline-block cursor-pointer hover:text-green-300"}>Advice # {props.adviceID}</h1>
    )
}