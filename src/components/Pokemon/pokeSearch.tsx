import React, {useEffect, useState} from "react";
import {Results} from "./results";
import { createSearchParams, useNavigate } from "react-router-dom";


export const PokeSearch = () => {
    const navigate = useNavigate();
    let [search, setSearch] = React.useState<string>('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const search = params.get('search');
        if (search) {
            setSearch(search);
        }
    }, []);

    const handeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        if (e.target.value === '') {
            navigate({
                pathname: '/'
            })
        } else {
            navigate({
                search: createSearchParams({
                    search: e.target.value
                }).toString()
            })
        }
        console.log(search);
    }


    return (
        <div>
            <input type="text" className="col-6 rounded-2 p-2 mx-auto d-flex my-3" value={search} onChange={handeChange}/>
            <Results search={search}/>
        </div>
    );
}