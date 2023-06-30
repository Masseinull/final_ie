import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";

// components
import DashboardLayout from "./layout/DashboardLayout";

import GeneralProvider from "./Contexts/general-context";
import Login from "./pages/Login";
import Student from "./pages/students";
import Manager from "./pages/managers";
import Professors from "./pages/professors";
import Home from "./pages/Home"
import CreateMainCourse from "./pages/cCourse"
import CreateSemiCourse from "./pages/cSemiCourse"
import CreateProfessor from "./pages/cProf"
import CreateStudent from "./pages/cStudent"
import CreateManager from "./pages/cManager"
import Faculty from "./pages/Faculty"

const App = () => {
    return (
        <>
            {/* Dashboard Layout */}
            <GeneralProvider>
                <DashboardLayout>
                    <Switch>
                        <Route path="/" exact>
                            <Redirect to="/login" />
                        </Route>

                        <Route path="/dashboard" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/prof" component={Professors} />
                        <Route path="/student" component={Student} />
                        <Route path="/manager" component={Manager} />
                        <Route path="/faculty" component={Faculty} />

                        <Route path="/cMcourse" component={CreateMainCourse} />
                        <Route path="/cScourse" component={CreateSemiCourse} />
                        <Route path="/cProf" component={CreateProfessor} />
                        <Route path="/cStudent" component={CreateStudent} />
                        <Route path="/cManager" component={CreateManager} />
                    </Switch>
                </DashboardLayout>
            </GeneralProvider>
        </>
    );
};

export default App;
