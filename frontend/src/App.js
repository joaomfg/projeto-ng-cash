import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MasterProvider from "./context/Providers/MasterProvider";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div>
      <MasterProvider>
        <Switch>
          <Route exact path="/"><Redirect to="/login" /></Route>
          <Route path="/login" component={LoginPage} />
        </Switch>
      </MasterProvider>
    </div>
  );
}

export default App;
