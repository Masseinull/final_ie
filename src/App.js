import {Redirect, Route, Switch} from "react-router-dom";
import "./App.css";

// components
import DashboardLayout from "./layout/DashboardLayout";

import GeneralProvider from "./Contexts/general-context";
import Login from "./pages/Login";
import Student from "./pages/students";
import Manager from "./pages/managers";
import Professors from "./pages/professors";
import Home from "./pages/Home"

const App = () => {
    return (
        <>
            {/* Dashboard Layout */}
            <GeneralProvider>
                <DashboardLayout>
                    <Switch>
                        <Route path="/" exact>
                            <Redirect to="/login"/>
                        </Route>

                        <Route path="/dashboard" component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/prof" component={Professors}/>
                        <Route path="/student" component={Student}/>
                        <Route path="/manager" component={Manager}/>
                    </Switch>
                </DashboardLayout>
            </GeneralProvider>
        </>
    );
};

export default App;
