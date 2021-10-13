

import { useState, useEffect } from "react";

const AffectedView = ({ countryData }) => {
    const [country, setCountry] = useState("Loading....");
    const [daily, setDaily] = useState(0);
    const [monthly, setMonthly] = useState(0);
    const [yearly, setYearly] = useState(0);

    useEffect(() => {
        if (countryData) {
            setCountry(countryData.name);

            let tempDaily = 0;
            let tempMonthly = 0;
            let tempYearly = 0;

            const currentDate = new Date();

            countryData.infected.data.forEach((value) => {
                
                //calculate for daily date
                let tempDate = new Date(value.date);

                let tempTime = tempDate.getTime();
                //daily
                if(tempTime === currentDate.getTime())
                {
                    tempDaily += value.newCasesBySpecimenDate;
                }

                //monthly
                if((currentDate.getMonth() + 1) === (tempDate.getMonth() + 1))
                {
                    tempMonthly += value.newCasesBySpecimenDate;
                }

                //yearly
                tempYearly += value.newCasesBySpecimenDate;
            });


            setDaily(tempDaily);
            setMonthly(tempMonthly);
            setYearly(tempYearly);

        }
    }, [countryData]);


    return (
        <section className="p-2">
            <div className="card">
                <div className="card-body">
                    <h3><blockquote>People tested positive In {country}</blockquote></h3>
                </div>
            </div>


            <div className="row p-3">
                <div className="col-12">
                    <div className="card bg-light">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <p>
                                        Tested Positive <br />
                                        <b style={{ fontSize: "19px" }}>Duration</b>
                                    </p>
                                </div>

                                <div className="col mt-3">
                                    <b>Daily</b> <br />
                                    <h3>{daily}</h3>
                                </div>

                                <div className="col mt-3">
                                <b>This Month</b> <br />
                                    <h3>{monthly}</h3>
                                </div>

                                <div className="col mt-3">
                                <b>This Year</b> <br />
                                    <h3>{yearly}</h3>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default AffectedView;