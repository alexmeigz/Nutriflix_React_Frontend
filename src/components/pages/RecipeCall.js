// import React from 'react';
import React, { useState } from 'react';
// import React, { Component } from "react";
import Display from './Display';


function RecipeCall(props) {

    const [state, updateState] = useState({
        q: "",
        diet: ""
    })

    const [result, updateResult] = useState({
    })



    function handleChange(evt) { //updating form elements, nested function
        const name = evt.target.name //defined in render
        const value = evt.target.value //defined in render
        //because we are using a single state object above to hold multiple properties, we must save off the current state first (b/c we are only updating part of the object).  To do this, we "spread" state via ...state and add it to the new copy of state that updateState is creating, followed by any updates we want:
        updateState({
            ...state,
            [name]: value
        })
    }

    const submitForm = (evt) => {  //send creds to backend, nested arrow function
        evt.preventDefault();

        let url = `https://api.edamam.com/search?q=${state.q}&app_id=91203381&app_key=0449d632515eb9ee5ed2ed611e0c8032&from=0&to=3`


        fetch(url,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data["more"]) {
                    alert(`${data["hits"][0]["recipe"]["source"]}`)
                    updateResult(data)

                    // let temp = data["hits"][0]["recipe"]["shareAs"]
                    // let imgtemp = data["hits"][0]["recipe"]["image"]

                    // console.log(data)

                    //Need to add Redirect after creating Product
                }
                else {
                    alert(`Error with parameters`)
                }
            })
            .catch((error) => console.log("Recipe call error: " + error))
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <div className="form_input">
                    <label className="form_label" for="q"> Search: </label>
                    <input className="form_field" type="text" value={state.q} name="q" onChange={handleChange} />
                </div>
                <input className="form_submit" type="submit" value="Submit" />
            </form>
            {/* {!

                ? <div><button className="product_back_button" onClick={(e) => changeView(e, "product-view")}>Back</button>
                    {productView}
                </div>

                : <div className="container">
                    <h1> My Products </h1>
                    <div className="my_product_panel">
                        <div className="title">
                            Product Results (Total: {Object.keys(results).length})
        </div>
                        {Object.values(results).map(product => (
                            <button className="product_panel_button" onClick={(e) => changeView(e, "product-pane", {
                                name: product["product_name"],
                                price: product["price"],
                                list_date: product["list_date"],
                                location: product["location"],
                                subscription: product["subscription"],
                                caption: product["caption"],
                                image_url: product["image_url"],
                                vendor_id: product["vendor_id"],
                                product_id: product["product_id"]
                            })}>
                                <ProductPane
                                    name={product["product_name"]}
                                    price={product["price"]}
                                    list_date={product["list_date"]}
                                    location={product["location"]}
                                    subscription={product["subscription"]}
                                    caption={product["caption"]}
                                    image_url={product["image_url"]}
                                    vendor_id={product["vendor_id"]}
                                    product_id={product["product_id"]}
                                />
                            </button>
                        ))}
                    </div>
                </div>
            } */}
        </div>
    )
}
export default RecipeCall;