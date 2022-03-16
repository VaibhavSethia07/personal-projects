import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
/*Since we can create events and book events, log and create users. We also need to add protection to make sure we access certain pages after
authentication. 
Install the `react-router-dom` package to enable routing */
import AuthPage from "./pages/Auth";
import BookingsPage from "./pages/Bookings";
import EventsPage from "./pages/Events";
import MainNavigation from "../components/navigation/MainNavigation";

function App() {
  return (
    <Router>
      {/* Router doesn't render muliple components */}
      <>
        <MainNavigation />
        {/* The first matching of the routes will be used. */}
        <main className="main-content">
          <Switch>
            {/* The components are stored in `pages` folder. exact allows for exact matching */}

            <Redirect from="/" to="/auth" exact />
            <Route path="/auth" component={AuthPage} />
            <Route path="/events" component={EventsPage} />
            <Route path="/bookings" component={BookingsPage} />
          </Switch>
        </main>
      </>
    </Router>
  );
}

export default App;
