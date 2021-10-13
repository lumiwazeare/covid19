

const PageHeader = ({onCountryChange, currentCountry, countries}) => {
    return ( 
        <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-dark">
            <div className="container">
            <span className="navbar-brand" href="">Covid19 Tracker</span>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mycollapse">
                <span className="navbar-toggler-icon"></span> </button>
            
                <div className="collapse navbar-collapse" id="mycollapse">
                    <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <span className="nav-link">Country <span className="bi bi-pin-map"></span> : <b>{currentCountry}</b></span>
                    </li>
                    </ul>

                    <form className="d-flex">
                        <div className="input-group">
                            <span className="input-group-text">Change</span>
                            <select onChange={onCountryChange} value={currentCountry} name="" id="" className="from-control-select">
                            <option disabled>Please select a country</option>

                            {
                                countries && countries.map(v => (<option key={v.id} value={v.name}>{v.name}</option>))
                            }
                            </select>
                        </div>
                    </form>
                </div>
            </div>
        
    </nav>
    );
}
 
export default PageHeader;