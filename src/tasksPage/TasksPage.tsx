import React, {useEffect, useState} from "react";
import "../tasksPage/TaskPage.css";
import PostService from "../postService/PostService";
import {Button, Form, message, Modal} from "antd";
import TaskForm from "./TaskForm";
import OffersPage from "./OffersPage";

const TasksPage: React.FC = () => {
    const [activeIndexes, setActiveIndexes] = useState<number[]>([]);
    const [tasks, setTasks] = useState<any[]>([]);
    const [subjects, setSubjects] = useState<any[]>([]);
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
        const {title, description, startPrice, subject} = values;
        const token = localStorage.getItem('token');

        // Проверка наличия токена
        if (!token) {
            message.warning('Чтобы добавить задачу, необходимо авторизоваться.');
            return;
        }

        PostService.createTask(title, description, startPrice, subject, token)
            .then((response: any) => {
                setTasks([...tasks, response.data.materials[0]]);
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
            <Button type="primary" onClick={showModal} style={{marginBottom: '25px', alignContent: "center"}}>
                Добавить новую задачу
            </Button>

            {/* Модальное окно для ввода нового материала */}
            <Modal
                title="Добавить новую задачу"
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
                    <div className="panel" style={{display: activeIndexes.includes(index) ? "block" : "none", backgroundColor: " #e0e0e0"}}>
                        <p style={{marginBottom: "20px"}}>Описание: {task.description}</p>
                        <p style={{marginBottom: "20px"}}>Стартовая цена: {task.startPrice}</p>
                        <p style={{marginBottom: "20px"}}>Предмет: {task.subjectName}</p>
                        <OffersPage taskId={task.id}/>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default TasksPage;
