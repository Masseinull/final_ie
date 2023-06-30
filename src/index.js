import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import theme from "./theme";
import reportWebVitals from "./reportWebVitals";
import rtlPlugin from 'stylis-plugin-rtl';
import {prefixer} from 'stylis';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import store,{persistor} from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});
ReactDOM.render(
    <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <BrowserRouter>

                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>

                        <App />
                    </PersistGate>

                </Provider>
            </BrowserRouter>

        </ThemeProvider>
    </CacheProvider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
