import React, {useState, useEffect} from "react";
import "./ChatPage.css";
import PostService from "../postService/PostService";
import {Avatar, Button, Col, Input, message, Row} from "antd";

const ChatPage: React.FC = () => {
    const [chats, setChats] = useState<any[]>([]);
    const [selectedChat, setSelectedChat] = useState<any>();
    const [messageText, setMessageText] = useState("");
    const [lastMessages, setLastMessages] = useState<any[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);

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

    const getMessages = (chat: any, pageNum: any) => {
        setPageNumber(pageNum);
        setSelectedChat(chat);
        const token = localStorage.getItem('token');
        if (!token) {
            message.warning('Чтобы просмотреть сообщения, необходимо авторизоваться.');
            return;
        }
        PostService.getLastMessages(chat.id, token, pageNum, pageSize).then((response: any) => {
            const messagesWithDates = response.data.map((message: any) => ({
                ...message,
                created: new Date(message.created)
            }));

            const sortedMessages = messagesWithDates.sort((a: any, b: any) => {
                return a.created - b.created;
            });

            setLastMessages(sortedMessages);
        });
    }

    const handleSelectedChatClick = (chat: any) => {
        setPageNumber(0);
        getMessages(chat, 0);
    }

    const sendMessage = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            message.warning('Чтобы отправлять сообщения, необходимо авторизоваться.');
            return;
        }
        PostService.postMessage(selectedChat.id, messageText, token).then(() =>
            getMessages(selectedChat, pageNumber)
        );
        setMessageText("");
    };

    const goToPreviousPage = () => {
        if (pageNumber > 0) {
            setPageNumber(pageNumber - 1);
            getMessages(selectedChat, pageNumber - 1);
        }
    }

    const goToNextPage = () => {
        setPageNumber(pageNumber + 1);
        getMessages(selectedChat, pageNumber + 1);
    }

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
                                <span style={{marginLeft: "10px"}}>{message.userName}: {message.text}</span>
                            </div>
                        ))}

                        <Row gutter={16} style={{marginTop: "20px"}}>
                            <Col flex="auto">
                                <Input
                                    type="text"
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    placeholder="Введите сообщение..."
                                />
                            </Col>
                            <Col>
                                <Button onClick={sendMessage}>Отправить</Button>
                            </Col>
                        </Row>

                        <div style={{marginTop: "20px"}}>
                            <Button onClick={goToPreviousPage} disabled={pageNumber === 0}>Предыдущая страница</Button>
                            <Button onClick={goToNextPage} style={{marginLeft: "10px"}}
                                    disabled={lastMessages.length < pageSize}>Следующая страница</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
