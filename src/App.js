// App.js
// Modified by: Joseph Ng

import React, { useState }from 'react';
import { Route, Switch } from 'react-router-dom';

// import NavigationBar from './components/common/NavigationBar';
// import ContactUsFooter from "./components/common/ContactUsFooter";
// import AccountInfoBar from "./components/common/AccountInfoBar";

import DefaultHomePage from './components/pages/DefaultHomePage';
import MapsPage from './components/pages/MapsPage'
import VendorsPage from './components/pages/VendorsPage';
import RecipesPage from './components/pages/RecipesPage'
import ProductsPage from './components/pages/ProductsPage';
import LoginPage from "./components/pages/LoginPage";
import LogoutPage from "./components/pages/LogoutPage";
import ContactUsPage from "./components/pages/ContactUsPage";
import MyProfilePage from "./components/pages/MyProfilePage";
import MyProductsPage from "./components/pages/MyProductsPage";
import MyApplPage from "./components/pages/MyApplPage";
import CreateUserPage from "./components/pages/CreateUserPage";

import ErrorPage from './components/pages/ErrorPage';
// import ContactUsFooter from './components/common/ContactUsFooter';

import ProductForm from './components/pages/CreateProduct';
//import LoggedInHomePage from './components/pages/LoggedInHomePage';

function App() {
    // eslint-disable-next-line
    var id=2;
    // eslint-disable-next-line
    const [isLoggedIn, setIsLoggedIn] = useState(false); // testing conditional rendering
    // eslint-disable-next-line
    const [user, setUser] = useState({})

    function handleLoginChange(value) {
        setIsLoggedIn(value);
    }
    // eslint-disable-next-line
    function handleUserChange(value) {
        setUser(value);
    }

    return (
        // TODO: Change to new Nutriflix components
        <main>
            <Switch>
		        <Route path="/" exact>
                    <DefaultHomePage isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange}/>
                </Route>
                <Route path="/maps">
                    <MapsPage isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange}/>
                </Route>
                <Route path="/vendors">
                    <VendorsPage isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange}/>
                </Route>
                <Route path="/recipes">
                    <RecipesPage isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange}/>
                </Route>
                <Route path="/products">
                    <ProductsPage isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange}/>
                </Route>
                <Route path="/login">
                    <LoginPage isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange}/>
                </Route>
                <Route path="/logout">
                    <LogoutPage isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange}/>
                </Route>
                <Route path="/contact-us">
                    <ContactUsPage isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange}/>
                </Route>
                

                {/* Must be signed in to access pages */}
                {isLoggedIn 
                    ? (<Route path="/my-profile">
                        <MyProfilePage isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange}/>
                    </Route>)
                    : null
                }
                {isLoggedIn
                    ? (<Route path="/my-products">
                        <MyProductsPage isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange}/>
                    </Route>)
                    : null
                }
                {/*PRANAV: temporary create user tab on navbar*/}
                {!isLoggedIn
                    ? (<Route path="/create-user">
                        <CreateUserPage isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange}/>
                    </Route>)
                    : null
                }
                
                <Route path="/create-product">
                    <ProductForm isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange}/>
                </Route>
                <Route path="/vendor-apply">
                    <MyApplPage isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange}/>
                </Route>

	            <Route>
                    <ErrorPage isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange}/>
                </Route>
            </Switch>
        </main>
    );
};
export default App;
