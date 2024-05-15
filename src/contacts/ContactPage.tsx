import React from "react";
import "../contacts/contactPage.css";

const ContactPage: React.FC = () => {

    return (
        <div>
            <header style={{
                fontSize: '24px',
                fontWeight: 'bold',
            }}
            >
                Контакты:
            </header>
            <div>
                <a
                    href="https://t.me/malignantt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={'link'}
                >
                    Самый лучший фронтендер
                </a>

            </div>
            <div>
                <a
                    href="https://t.me/yrthmv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={'link'}
                >
                    Самый лучший бэкендер
                </a>

            </div>
            <div>
                <a
                    href="https://t.me/makar_mikhalev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={'link'}
                >
                    Второй лучший бэкендер
                </a>

            </div>

            <div>
                <a
                    href="https://t.me/spl1t1kszzz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={'link'}
                >
                    Лучший.
                </a>

            </div>
        </div>
    );
}

export default ContactPage;
