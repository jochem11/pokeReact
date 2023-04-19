import React from "react";
// @ts-ignore
import pokeLogo from "../../assets/images/pokeLogo.png";
import {PokeSearch} from "./pokeSearch";


export const Pokemon = () => {
    return (
        <div>
            <header className="w-100">
                <img src={pokeLogo} alt="" className="responsive col-5 d-flex mx-auto"/>
            </header>
            <PokeSearch />
        </div>
    );
}