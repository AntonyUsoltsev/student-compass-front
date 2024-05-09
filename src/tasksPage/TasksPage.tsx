import React, {useEffect, useState} from "react";
import "../tasksPage/TaskPage.css";
import PostService from "../postService/PostService";
import {Button, Form, message, Modal} from "antd";
import axios from "axios";
import TaskForm from "./TaskForm";

const TasksPage: React.FC = () => {
    const [activeIndexes, setActiveIndexes] = useState<number[]>([]);
    const [tasks, setTasks] = useState<any[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        PostService.getTasks().then((response: any) => {
            setTasks(response.data);
        });
    }, []);

    const handleAccordionClick = (index: number) => {
        const indexExists = activeIndexes.includes(index);
        setActiveIndexes((prevIndexes) =>
            indexExists ? prevIndexes.filter((prevIndex) => prevIndex !== index) : [...prevIndexes, index]
        );
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleAddTask = (values: any) => {
        const {author, name, link} = values;
        const token = localStorage.getItem('token');

        // Проверка наличия токена
        if (!token) {
            message.warning('Чтобы добавить задачу, необходимо авторизоваться.');
            return;
        }

        // Отправка запроса на бэкэнд с данными нового материала и токеном пользователя
        axios.post(`http://localhost:8080/student_compass/create_task}`, {
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
                setTasks([...tasks, response.data.materials[0]]);
                // Очистка полей ввода
                form.resetFields();
                message.success('Задача успешно добавлена.');
            })
            .catch(error => {
                console.error('Ошибка при добавлении задач:', error);
                message.error('Ошибка при добавлении задачи. Пожалуйста, попробуйте еще раз.');
            });
    };

    return (
        <div>
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
                <TaskForm onFinish={handleAddTask}/>
            </Modal>

            {tasks.map((task, index) => (
                <div key={index}>
                    <button
                        className={`accordion ${activeIndexes.includes(index) ? "active" : ""}`}
                        onClick={() => handleAccordionClick(index)}
                    >
                        {task.title}
                        <i className="fas fa-angle-down"></i>
                    </button>
                    <div className="panel" style={{display: activeIndexes.includes(index) ? "block" : "none"}}>
                        <p style={{marginBottom: "20px"}}>Описание: {task.description}</p>
                        <p style={{marginBottom: "20px"}}>Стартовая цена: {task.startPrice}</p>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default TasksPage;
