import {createBrowserRouter, Route} from "react-router-dom";
import React from "react";
import {Pokemon} from "./components/Pokemon/Pokemon";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <Pokemon />,
        children: [
            {
                path: "/:search",
                element: <Pokemon />
            }
        ]
    },
]);
