export default function AdviceQuotation(props: {
    quote: string
}) {
    return (
        <p className={"text-xl font-semibold"}>
            <q>&nbsp;{ props.quote }&nbsp;</q>
        </p>
    )
}