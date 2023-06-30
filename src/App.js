import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";

// components
import DashboardLayout from "./layout/DashboardLayout";

import GeneralProvider from "./Contexts/general-context";

import Home from "./pages/Home"
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

            </Switch>
          </DashboardLayout>
        </GeneralProvider>
      </>
  );
};

export default App;
