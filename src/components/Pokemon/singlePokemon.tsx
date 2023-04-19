import React from "react";
import "./Pokemon.scss"
// @ts-ignore
import noImg from "../../assets/images/No-image-found.webp"

interface Props {
    name: string;
    url: string;
}

export const SinglePokemon: React.FC<Props> = (props) => {

    let [overlay, setOverlay] = React.useState<boolean>(false);
    let [data, setData] = React.useState<any>([]);
    let [dataReceived, setDataReceived] = React.useState<boolean>(false);
    let [abilities, setAbilities] = React.useState<any>([]);

    const getIdFromUrl = (url: string) => {
        return url.split('/')[url.split('/').length - 2];
    }

    let [imgUrl, setImgUrl] = React.useState<any>(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIdFromUrl(props.url)}.png`)


    if (overlay) {
        if (!dataReceived) {
            fetch(props.url)
                .then((res) => {
                    if (!res.ok) {
                        throw Error(res.statusText);
                    }
                    return res.json();
                })
                .then((data) => {
                    setData(data);
                    setAbilities(data.abilities);
                    setDataReceived(true);
                    console.log(data);
                })
        }
        return (
            <>
                <div className="bg-light border border-2 rounded p-2 d-flex align-items-center justify-content-center flex-column singlePokemon">
                    <strong>{getIdFromUrl(props.url)}. {props.name}</strong>
                    <img src={imgUrl} className="img" alt="pokemon img"/>
                </div>
                <div className="overlay" onClick={()=> setOverlay(false)}>
                    <div className="bg-light p-2 rounded-3 h-75 col-8 position-relative" onClick={(e)=> e.stopPropagation() }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-x-lg" viewBox="0 0 16 16" onClick={()=> setOverlay(false)}>
                            <path
                                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                        </svg>
                        <h2 className="text-center">{getIdFromUrl(props.url)}. {props.name}</h2>
                        <div className="d-flex justify-content-center">
                            <img src={imgUrl} alt="pokemon img" className="col-2 responsive"/>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <div className="col-6 ps-2">
                                <strong>abilities</strong>
                                <ul>
                                    {
                                        abilities.map((ability: any) => {
                                            return <li>{ability.ability.name}</li>
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="col-6 ps-2">
                                <p>Height: {data.height}</p>
                                <p>Weight: {data.weight}KG</p>
                                <p>Base experience: {data.base_experience}</p>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <div className="bg-light border border-2 rounded p-2 d-flex align-items-center justify-content-center flex-column singlePokemon" onClick={()=> setOverlay(true)}>
                <strong>{getIdFromUrl(props.url)}. {props.name}</strong>
                <img src={imgUrl} alt="pokemon img" className="img" onError={()=> {setImgUrl(noImg)}}/>
            </div>
        );
    }
}