import React, {useState, useEffect} from "react";
import "./ChatPage.css";
import PostService from "../postService/PostService";
import {Avatar, message} from "antd"; // Подключаем файл стилей для страницы чата

const ChatPage: React.FC = () => {
    // Состояния для списка пользователей, последних чатов, выбранного чата и текста сообщения
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messageText, setMessageText] = useState("");

    // Функция для загрузки данных (пользователей и чатов) из базы данных
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (!token) {
            message.warning('Чтобы просмотреть чат, необходимо авторизоваться.');
            return;
        }
        PostService.getChats(token).then((response: any) => {
            setChats(response.data);
        });
    }, []);


    const handleSelectedChatClick = (chat: any) => {
        console.log(chat);
        setSelectedChat(chat);

    }

    // Функция для отправки сообщения
    const sendMessage = () => {
        // Ваш код для отправки сообщения в выбранный чат
        // Пример:
        // sendMessagetoDatabase(selectedChat, messageText);
        // Очищаем поле ввода после отправки сообщения
        setMessageText("");
    };

    return (
        <div className="chat-page">
            <div className="recent-chats">
                <h2>Последние чаты</h2>
                <ul>
                    {chats.map((chat: any) => (
                        <div className="chat-button" onClick={() => handleSelectedChatClick(chat)}>
                            <Avatar style={{backgroundColor: '#87d068', marginRight: '10px'}}>{chat.name[0]}</Avatar>
                            <span>{chat.name}</span>
                        </div>
                    ))}
                </ul>
            </div>


            <div className="chat-window">
                {selectedChat && (
                    <div>
                        {/* Ваш код для отображения сообщений выбранного чата */}
                        {/* Пример:
                        {selectedChat.messages.map((message, index) => (
                            <div key={index} className="message">
                                {message.sender}: {message.text}
                            </div>
                        ))}
                        */}
                        {/* Поле для ввода сообщения */}
                        <input
                            type="text"
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            placeholder="Введите сообщение..."
                        />
                        {/* Кнопка для отправки сообщения */}
                        <button onClick={sendMessage}>Отправить</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
