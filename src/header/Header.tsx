import React, {useState} from "react";
import {FaShoppingCart} from "react-icons/fa";
import {useHistory} from "react-router-dom";
import "../header/Header.css"
import AuthButtons from "../auth/AuthButtons";

const Header = () => {

    const history = useHistory();

    let [cartOpen, setCartOpen] = useState(false);
    const handleButtonClick = (route: any) => {
        history.push(route);
        window.location.reload();
    };
    return (
        <header>
            <div>
                <AuthButtons/>
                <span className='logo' onClick={() => handleButtonClick("/student_compass")}>Student Compass</span>

                <ul className='nav'>
                    <li onClick={() => handleButtonClick("/student_compass/chat")}>Чат</li>
                    <li onClick={() => handleButtonClick("/student_compass/tasks")}>Задачи</li>
                    <li onClick={() => handleButtonClick("/student_compass/materials")}>Материалы</li>
                    <li onClick={() => handleButtonClick("/student_compass/contacts")}>Контакты</li>
                </ul>

            </div>
            <div className='presentation'></div>
        </header>
    )
}

export default Header;