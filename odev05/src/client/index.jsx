import React from "react";
import ReactDOM from "react-dom";

import {Game} from "./Game";
import {Home} from "./home";
import {HashRouter, Link, Route, Switch} from "react-router-dom";



const notFound = () => {
    return (
        <div>
            <h2>Sayfa Bulunamadı: 404</h2>
            <p>
                Hata: Aradığınız sayfaya şu anda ulaşılamıyor.
                Lütfen daha sonra tekrar deneyiniz.
            </p>
            <div className="action">
                <Link className="play" to={"/"}>Ana Sayfaya Dön</Link>
            </div>
        </div>
    )
}

export const App = () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/Game" component={Game}></Route>
                <Route exact path="/" component={Home}></Route>
                <Route exact component={notFound}/>
            </Switch>
        </HashRouter>
    );
};
ReactDOM.render(<App />, document.getElementById("root"));