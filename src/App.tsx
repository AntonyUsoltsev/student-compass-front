import React from 'react';
import './App.css';
import {BrowserRouter, BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from "./header/Header";
import BookListPage from "./materials/materialList/MaterislList";
import UniversityPage from "./materials/universityChose/university";
import ChatPage from "./chat/ChatPage";
import ContactPage from "./contacts/ContactPage";
import TasksPage from "./tasksPage/TasksPage";

class App extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <Header></Header>

                <BrowserRouter>
                    <Switch>
                        <Route path="/student_compass/:university/:course/:subject" component={BookListPage}/>
                        <Route path="/student_compass/materials" component={UniversityPage}/>
                        <Route path="/student_compass/chat" component={ChatPage}/>
                        <Route path="/student_compass/contacts" component={ContactPage}/>
                        <Route path="/student_compass/tasks" component={TasksPage}/>
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
