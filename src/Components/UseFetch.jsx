import { useState, useEffect } from "react";

const useFetch = (url) => {
    //todo: add abortController
    const[data, setData] = useState(null);

    useEffect( () => {
        setData(null); //just in case this aborts or errors out
        //register new abortController, pass .signal to fetch, abort on cleanup
        const controller = new AbortController();

        fetch(url, {signal: controller.signal })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => setData(data))
        .catch((e) => {
            if (e.name !== "AbortError") {
                console.log(`Error fetching data: ${e.message}`);
            }
        });

        return () => controller.abort();

    },[url])

    return [data];
}

export default useFetch
