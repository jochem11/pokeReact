import React, {useEffect, useState} from "react";
import {SinglePokemon} from "./singlePokemon";
import "./Pokemon.scss";

interface Props {
    search: string;
}

export const Results: React.FC<Props> = (props) => {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=1500';

    const [results, setResults] = useState<any>([]);

    useEffect(() => {
        fetchPokemon();
        console.log(results);
    }, []);

    const fetchPokemon = () => {
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                return res.json();
            })
            .then((data) => {
                setResults(data.results);
            });
    }
    return (
        <div className="results p-2">
            {
                results.filter((result: any) => {
                    return result.name.includes(props.search);
                }).map((result: any) => {
                    return <SinglePokemon name={result.name} url={result.url} key={result.name}/>
                })
            }
        </div>
    );
}