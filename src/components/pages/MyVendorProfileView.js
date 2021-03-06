// MyVendorProfileView.js
// Engineer: Joseph Ng

import React, { useState } from 'react';
import "./MyProfilePage.css"
import "./Vendor.css"

import VendorProfileView from "./VendorProfileView";


function MyVendorProfileView(props) {
    let server = "http://localhost:8118/api"
    if (process.env.REACT_APP_REMOTE === "1") { 
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    if (process.env.NODE_ENV !== "development") {
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }

    const [settingsMode, setSettingsMode] = useState(false);
    const [newUserInfo, setNewUserInfo] = useState({
        ...JSON.parse(sessionStorage.getItem("user"))
    })

    function resetNewUserInfo() {
        setNewUserInfo({
            ...JSON.parse(sessionStorage.getItem("user")),
            vendor_image_url: "",
            vendor_name: ""
        })
    }

    function toggleView(e) {
        setSettingsMode(prevSettingsMode => !prevSettingsMode);
    }


    // eslint-disable-next-line
    function onUserChange(value) {
        props.onUserChange(value)
    }

    function handleNewUserChange(event) {
        setNewUserInfo({
            ...newUserInfo,
            [event.target.name]: event.target.value
        })
    }

    function submitNewUserInfo(event) {
        let required_params = ["user_id"];
        let updatable_params = ["vendor_image_url", "vendor_name"];

        event.preventDefault();
        

        let url = `${server}/user/?`


        required_params.forEach((param, index) => {
            if (newUserInfo[param] === "") {
                newUserInfo[param] = JSON.parse(sessionStorage.getItem("user"))[param]; 
            }
            url += `&${param}=${newUserInfo[param]}`
        });
            
        updatable_params.forEach((param, index) => {
            if (newUserInfo[param] !== "") {
                 url += `&${param}=${newUserInfo[param]}`
            } else {
                newUserInfo[param] = JSON.parse(sessionStorage.getItem("user"))[param]; 
            }
        });
        
        fetch(url, 
            {
              method: 'PATCH',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },           
            })
            .then(response => response.json()) 
              .then(data => {
              if(data["message"] === "User successfully updated"){
                alert(`User successfully updated. Please refresh the screen to see updates.`)
                onUserChange(newUserInfo);
              }
              else{
                alert(`Error updating user info: ${data["message"]}`)
              }
            })
            .catch((error) => console.log("User update error: "+ error))
    }

    return (
        <div>
            <div className="vendor-profile">
                <h1>
                    Vendor Profile
                    <h3>Info outlined in red shows how others will see your store:</h3>
                </h1>
            </div>
            <div className="settings-pane">
                {!settingsMode 
                    ? <div>
                        <button className="change-info" onClick={(event) => {toggleView(); resetNewUserInfo()}}>Change Vendor Info/Settings</button>
                    </div>
                    : <div>
                        <button className="cancel-info" onClick={(event)=> {toggleView()}}>Cancel</button>
                        <button className="submit-info" onClick={(event)=> {toggleView(); submitNewUserInfo(event)}}>Submit Changes</button>
                        <div className="form_input">
                            <label className="form_label" for="vendor_image_url">New Vendor Profile Image URL: </label>         
                            <input className="form_field" type="text" value={newUserInfo.vendor_image_url} name="vendor_image_url" onChange={handleNewUserChange} />
                        </div>
                        <div className="form_input">
                            <label className="form_label" for="vendor_name">New Vendor Name: </label>         
                            <input className="form_field" type="text" value={newUserInfo.vendor_name} name="vendor_name" onChange={handleNewUserChange} />
                        </div>
                    </div>
                }
                
            </div>
            
            <div className="vendor-info">
                <VendorProfileView isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={onUserChange} vendor_id={JSON.parse(sessionStorage.getItem("user")).user_id}/>
            </div>
        </div>
    )
}


export default MyVendorProfileView;