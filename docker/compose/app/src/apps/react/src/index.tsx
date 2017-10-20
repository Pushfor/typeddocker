// Example based on https://github.com/vaibhavmule/react-redux-helloworld
import "babel-polyfill";

import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./components/App";
import helloReducer from "./reducers";


let store = createStore(helloReducer);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
