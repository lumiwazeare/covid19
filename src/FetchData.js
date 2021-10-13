import { useEffect, useState } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null)

    useEffect(()=> {
        const abort = new AbortController();
        fetch(url,{
            signal:abort.signal,
        })
        .then(res => {
            return res.json()}
            )
        .then(res => {
            setData(res.countries)
        })
        .catch(e => {
            //console.log(JSON.stringify(e.name));
        });

        return () => {abort.abort()};
    },[url])
    return { data };
}
 
export default useFetch;