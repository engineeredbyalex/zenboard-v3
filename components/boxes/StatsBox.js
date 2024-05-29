function StatsBox(props) {
    const isPositiveWeek = props.percent_value > 0;
    const isPositiveMonth = props.value_week > 0;
    const textColorWeek = isPositiveWeek ? 'green_text' : 'red_text';
    const textColorMonth = isPositiveMonth ? 'green_text' : 'red_text';

    return (
        <div className="box">
            <div className='flex flex-col items-center justify-center'>
                <h4 className="black_text font-medium uppercase">{props.title}</h4>
                <h4 className="">
                    {props.value}
                </h4>
                <div className='flex gap-5'>
                    <p className={textColorWeek}>
                        {props.percent_value > 0 ? (`${props.percent_value}% this month`) : (null)}

                    </p>
                    <p className={textColorWeek}>
                        {props.percent_value > 0 ? (`${props.percent_value}% this week`) : (null)}
                    </p>
                </div>
            </div>
        </div >
    );
}

export default StatsBox;
