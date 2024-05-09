import React, {useState} from "react";
import {FaShoppingCart} from "react-icons/fa";
import {useHistory} from "react-router-dom";
import "../header/Header.css"

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
                <span className='logo' onClick={() => handleButtonClick("/")}>Student Compass</span>

                <ul className='nav'>
                    <li onClick={() => handleButtonClick("/chat")}>Чат</li>
                    <li onClick={() => handleButtonClick("/tasks")}>Задачи</li>
                    <li onClick={() => handleButtonClick("/materials")}>Материалы</li>
                    <li onClick={() => handleButtonClick("/contacts")}>Контакты</li>
                </ul>

            </div>
            <div className='presentation'></div>
        </header>
    )
}

export default Header;