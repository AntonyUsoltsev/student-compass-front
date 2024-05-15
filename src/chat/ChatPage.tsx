import React, {useState, useEffect} from "react";
import "./ChatPage.css";
import PostService from "../postService/PostService";
import {Avatar, message} from "antd";
const ChatPage: React.FC = () => {
    const [chats, setChats] = useState<any[]>([]);
    const [selectedChat, setSelectedChat] = useState<any>();
    const [messageText, setMessageText] = useState("");
    const [lastMessages, setLastMessages] = useState<any[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            message.warning('Чтобы просмотреть чат, необходимо авторизоваться.');
            return;
        }
        PostService.getChats(token).then((response: any) => {
            setChats(response.data);
        });
    }, []);

    const getMessages = () => {
        if (selectedChat) {
            const token = localStorage.getItem('token');
            if (!token) {
                message.warning('Чтобы просмотреть сообщения, необходимо авторизоваться.');
                return;
            }
            PostService.getLastMessages(selectedChat.id, token).then((response: any) => {
                setLastMessages(response.data);
            });
        }
    }

    const handleSelectedChatClick = (chat: any) => {
        setSelectedChat(chat);
        getMessages()
    }

    const sendMessage = () => {
        // PostService.putMessage(selectedChat.id, )
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
                        {lastMessages.map((message, index) => (
                            <div key={index} className="message">
                                <Avatar>{message.userName[0]}</Avatar>
                                <span>{message.userName}: {message.text}</span>
                            </div>
                        ))}
                        <input
                            type="text"
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            placeholder="Введите сообщение..."
                        />
                        <button onClick={sendMessage}>Отправить</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
