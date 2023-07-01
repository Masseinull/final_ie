import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";

// components
import DashboardLayout from "./layout/DashboardLayout";
import ErrorPage from "./pages/404";
import Login from "./pages/Login";
import adduser from "./pages/cCourse";
import Faculty from "./pages/Faculty";
import User from "./pages/User";
import Student from "./pages/students";
import Courses from "./pages/courses";
import Manager from "./pages/managers";
import Professors from "./pages/professors";
import SemiCourses from "./pages/semiCourse";
import CreateStudent from "./pages/cStudent";
import CreateProfessor from "./pages/cProf";
import CreateMainCourse from "./pages/cCourse";
import CreateManager from "./pages/cManager";
import CreateSemiCourse from "./pages/cSemiCourse";
import CreateFaculty from "./pages/cFaculty"
import GeneralProvider from "./Contexts/general-context";
import PreRegister from "./pages/PreRegister"
import Register from "./pages/Register";
import Term from "./pages/Term";
import CreateTerm from "./pages/cTerm";
import UpdateTerm from "./pages/uTerm";
import UpdateStudent from "./pages/uStudent";
import UpdateProfessor from "./pages/uProf";
const App = () => {
  return (
    <>
      {/* Dashboard Layout */}
      <GeneralProvider>
      <DashboardLayout>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/dashboard" />
          </Route>

          <Route path="/dashboard" component={Faculty} />
          <Route path="/user" component={User} />
          <Route path="/faculty" component={Faculty} />
          <Route path="/cFaculty" component={Faculty} />

          <Route path="/login" component={Login} />
          <Route path="/adduser" component={adduser} />
          <Route path="/prof" component={Professors} />
          <Route path="/student" component={Student} />
          <Route path="/manager" component={Manager} />
          <Route path="/mainCourse" component={Courses} />
          <Route path="/semiCourse" component={SemiCourses} />
          {/* <Route path="/register" component={Register} /> */}

          <Route path="/preregister" component={PreRegister} />

          <Route path="/cMcourse" component={CreateMainCourse} />
          <Route path="/cScourse" component={CreateSemiCourse} />
          <Route path="/cFaculty" component={CreateFaculty} />
          <Route path="/cProf" component={CreateProfessor} />
          <Route path="/cStudent" component={CreateStudent} />
          <Route path="/cManager" component={CreateManager} />

          <Route path="/uStudent" component={UpdateStudent}/>
          <Route path="/uProf" component={UpdateProfessor}/>

          <Route path="/term" component={Term} />
          <Route path="/cTerm" component={CreateTerm} />
          <Route path="/uTerm" component={UpdateTerm} />

          <Route path="/404" component={ErrorPage} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </DashboardLayout>
      </GeneralProvider>
    </>
  );
};

export default App;
