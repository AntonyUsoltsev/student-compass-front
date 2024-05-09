import React, {useState, useEffect} from 'react';
import {List, Button, message, Spin, Form, Modal} from 'antd';
import PostService from "../../postService/PostService";
import ReviewList from "../reviewList/ReviewList";
import AddMaterialForm from "./AddMaterailForm";
import {useParams} from "react-router-dom";
import "./MaterialStyle.css";

import axios from "axios";

const BookList = () => {
    const [data, setData]: any = useState();
    const [books, setBooks]: any = useState<any[]>([]);
    const [reviews, setReviews]: any = useState([]);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const {university, course, subject}: any = useParams();


    useEffect(() => {
        PostService.getBooks(university, course, subject).then((response: any) => {
            const inputData = response.data;
            setData(inputData);
            setBooks(inputData.materials);
            setReviews(inputData.reviews);
            setLoading(false);
        });
    }, [university, course, subject]);

    const handleDownload = (bookLink: any) => {
        const isUserAuthenticated = checkUserAuthentication();
        if (isUserAuthenticated) {
            handleView(bookLink);
        } else {
            showWarning();
        }
    };

    const checkUserAuthentication = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return false;
        }
        return true;
    };

    const showWarning = () => {
        message.warning('Для просмотра необходимо авторизоваться.');
    };

    const handleAddMaterial = (values: any) => {
        const {author, name, link} = values;
        const token = localStorage.getItem('token');

        // Проверка наличия токена
        if (!token) {
            message.warning('Чтобы добавить материал, необходимо авторизоваться.');
            return;
        }

        // Отправка запроса на бэкэнд с данными нового материала и токеном пользователя
        axios.post(`http://localhost:8080/auth/material/${subject}`, {
            author: author,
            name: name,
            link: link,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                // Обновление списка материалов после успешной отправки
                setBooks([...books, response.data.materials[0]]);
                // Очистка полей ввода
                form.resetFields();
                message.success('Материал успешно добавлен.');
            })
            .catch(error => {
                console.error('Ошибка при добавлении материала:', error);
                message.error('Ошибка при добавлении материала. Пожалуйста, попробуйте еще раз.');
            });
    };
    const handleView = (link: any) => {
        window.open(link, '_blank'); // Открываем ссылку в новой вкладке
    };
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="material-wrapper">
            {loading ? (
                <Spin size="large"/>
            ) : (
                <>
                    <header className="subjects-header">Список книг для предмета {data.name}</header>

                    {books.map((item: any, index: any) => (
                        <div key={index}>
                            <button className={`accordion`} onClick={() => handleDownload(item.link)}>
                                {item.name} - {item.author}
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    ))}

                    <Button type="primary" onClick={showModal} style={{marginTop: '10px', alignContent: "center",  marginLeft: '40%' }}>
                        Добавить материал
                    </Button>

                    {/* Модальное окно для ввода нового материала */}
                    <Modal
                        title="Добавить новый материал"
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <AddMaterialForm onFinish={handleAddMaterial}/>
                    </Modal>

                    <ReviewList selectedSubject={subject} selectedSubjectName={data.name} inputReviews={reviews}/>
                </>
            )}
        </div>
    );
};

export default BookList;
