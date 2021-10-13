import SharedGraph from "./SharedGraph";
import SharedTable from "./SharedTable";
import AffectedView from "./AffectedView";

import { useState, useEffect } from "react";

const Home = ({ countryData }) => {
    const [country, setCountry] = useState("Loading....");
    const [totalDose, setTotalDose] = useState({
        firstDaily: 0,
        firstTotal: 0,
        secondDaily: 0,
        secondTotal: 0
    });

    const [doseGraph, setDoseGraph] = useState({
        x:[0],
        y:[0]
    });

    const [doseTable, setDoseTable] = useState({
        column:[
            {
                name: 'Date',
                selector: row => row.date,
            },
            {
                name: 'State Code',
                selector: row => row.areaCode,
            },
            {
                name: 'Daily Vaccinated',
                selector: row => (row.newPeopleVaccinatedFirstDoseByPublishDate) ? row.newPeopleVaccinatedFirstDoseByPublishDate : row.newPeopleVaccinatedSecondDoseByPublishDate,
            },
            {
                name: 'Total Vaccinated',
                selector: row => (row.cumPeopleVaccinatedFirstDoseByPublishDate) ? row.cumPeopleVaccinatedFirstDoseByPublishDate : row.cumPeopleVaccinatedSecondDoseByPublishDate,
            },
        ],
        data:[]
    });

    const [selectedDose, setSelectedDose] = useState("firstDose");

    useEffect(()=>
    {
      if(countryData)
      {
          setCountry(countryData.name);

          let tempFirstDaily = 0;
          let tempFirstTotal = 0;

          let tempSecondDaily = 0;
          let tempSecondTotal = 0;

          //temp variable for the current dosage
          let tempDose = {
              x:[],
              y:[]
          };

          let tempDoseTable = {
            column:doseTable.column,
            data:[]
        };
        

          countryData.dose1.forEach((value,index) => {
            tempFirstDaily += value.newPeopleVaccinatedFirstDoseByPublishDate ? value.newPeopleVaccinatedFirstDoseByPublishDate : 0;
            tempFirstTotal += value.cumPeopleVaccinatedFirstDoseByPublishDate ? value.cumPeopleVaccinatedFirstDoseByPublishDate : 0;

            if(selectedDose === "firstDose")
            {
                tempDose.x.push(value.date);
                tempDose.y.push(value.newPeopleVaccinatedFirstDoseByPublishDate);

                tempDoseTable.data.push({...value,id:index + 1});
            }
          
        });


        countryData.dose2.forEach((value,index) => {
            tempSecondDaily += value.newPeopleVaccinatedSecondDoseByPublishDate ? value.newPeopleVaccinatedSecondDoseByPublishDate : 0;
            tempSecondTotal += value.cumPeopleVaccinatedSecondDoseByPublishDate ? value.cumPeopleVaccinatedSecondDoseByPublishDate : 0;

            if(selectedDose === "secondDose")
            {
                tempDose.x.push(value.date);
                tempDose.y.push(value.newPeopleVaccinatedSecondDoseByPublishDate);
                tempDoseTable.data.push({...value,id:index + 1});
            }
          
        });


          setTotalDose(
            {
                firstDaily: tempFirstDaily,
                firstTotal: tempFirstTotal,
                secondDaily: tempSecondDaily,
                secondTotal: tempSecondTotal
            }
          );

          setDoseGraph(tempDose);
          setDoseTable(tempDoseTable);
      }
    },[countryData]);

    const onDoseChange = (e) => {
        setSelectedDose(e.target.value);

        if(countryData)
        {
            //temp variable for the current dosage
          let tempDose = {
            x:[],
            y:[]
        };

        let tempDoseTable = {
            column:doseTable.column,
            data:[]
        };
      

        countryData.dose1.forEach((value,index) => {
          if(e.target.value === "firstDose")
          {
              tempDose.x.push(value.date);
              tempDose.y.push(value.newPeopleVaccinatedFirstDoseByPublishDate);
              tempDoseTable.data.push({...value,id:index + 1});
          }
        
      });


      countryData.dose2.forEach((value,index) => {
        
          if(e.target.value === "secondDose")
          {
              tempDose.x.push(value.date);
              tempDose.y.push(value.newPeopleVaccinatedSecondDoseByPublishDate);
              tempDoseTable.data.push({...value,id:index + 1});
          }
        
      });


        setDoseGraph(tempDose);
        setDoseTable(tempDoseTable);
        }
    };

    return (
        <div>
        <section className="p-2">
            <div className="card">
                <div className="card-body">
                    <h3><blockquote>COVID-19 CORONAVIRUS TRACKER FOR {country}</blockquote></h3>
                </div>
            </div>

            <p className="pt-2">
                Official page for data and insights on coronavirus (COVID-19).
            </p>

            <div className="row p-3">
                <div className="col-12">
                    <div className="card bg-light">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <p>
                                        Vaccinations <br />
                                        <b style={{ fontSize: "19px" }}>People vaccinated</b>
                                    </p>
                                </div>

                                <div className="col mt-3">
                                    Daily -- 1st dose <br />
                                    <h3>{totalDose.firstDaily}</h3>
                                </div>

                                <div className="col mt-3">
                                    Daily -- 2nd dose <br />
                                    <h3>{totalDose.secondDaily}</h3>
                                </div>
                            </div>

                            <div className="row mt-5 align-items-end">

                                <div className="col mt-3 offset-md-4">
                                    Total -- 1st dose <br />
                                    <h3>{totalDose.firstTotal}</h3>
                                </div>

                                <div className="col mt-3">
                                    Total -- 2nd dose <br />
                                    <h3>{totalDose.secondTotal}</h3>
                                </div>
                            </div>

                            <div className="row pt-5">
                                <div className="col-8">
                                    <div>
                                        <h6>Statistics For A Period Of One Year</h6>
                                    </div>
                                    <div className="form-floating">
                                        <select data-testid="dose-change" onChange={onDoseChange} value={selectedDose} className="form-select">
                                            <option value="firstDose">First Dose</option>
                                            <option value="secondDose">Second Dose</option>
                                        </select>
                                        <label>Select Dose</label>
                                    </div>
                                </div>
                            </div>

                            <div className="row pt-5">
                            <SharedGraph sideBarOpen={true} graph={doseGraph}/>
                            
                            </div>

                            <div className="row pt-5">
                                <div className="col">
                                    <SharedTable data={doseTable}/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </section>

        <AffectedView countryData={countryData}/>

        </div>
    );
}

export default Home;