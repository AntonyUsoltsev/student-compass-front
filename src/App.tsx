import React from 'react';
import './App.css';
import {BrowserRouter, BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from "./header/Header";
import AuthButtons from "./auth/AuthButtons";
import BookListPage from "./materials/materialList/MaterislList";
import contactPage from "./contacts/ContactPage";
import UniversityPage from "./materials/universityChose/university";

class App extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <Header></Header>
                <AuthButtons/>
                <BrowserRouter>
                    <Switch>
                        <Route path="/student_compass/:university/:course/:subject" component={BookListPage}/>
                        <Route path="/student_compass/materials" component={UniversityPage}/>
                        {/*<Route path="/student_compass/chat" component={chatPage}/>*/}
                        <Route path="/student_compass/contacts" component={contactPage}/>
                        <Route path="/student_compass"/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

const Root = () => {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <App/>
        </Router>
    );
}

export default Root;
