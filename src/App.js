//import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState , useEffect} from 'react';
import  Home from './Home';
import PageHeader from './PageHeader';
import useFetch from './FetchData';

function App() {

  const {data:countries} = useFetch("data/data.json");
  const [countryData, setCountryData] = useState(null);
  const [country, setCountry] = useState("Loading....")

  const onCountryChange = (e) => {
    setCountry(e.target.value);

    if(countries)
    {
      const result = countries.filter(d => { return d.name === e.target.value});
      setCountryData(result[0]);
    }
  }

  useEffect(()=>
    {
      if(countries && countries.length > 0)
      {
        setCountry(countries[0].name);
        //pick the default nigeria
          setCountryData(countries[0]);
      }
    },[countries])


  return (
      <Router>
        <PageHeader onCountryChange={onCountryChange} currentCountry={country} countries={countries}/>
        <Switch>
          <Route path="/" exact>
            <Home countryData={countryData} />
          </Route>

        </Switch>
      </Router>
    
      
  );
}

export default App;
