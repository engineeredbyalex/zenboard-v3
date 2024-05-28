function BigStatsBox(props, { children }) {
    return (
        <div className="box">
            <h4 className="black_text font-medium uppercase">{props.title}</h4>
            <div className="text-center  flex items-center  justify-center gap-5">
                {children}
            </div>
        </div>
    )
}

export default BigStatsBox