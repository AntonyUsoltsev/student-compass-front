import React, {useEffect, useState} from "react";
import "../tasksPage/TaskPage.css";
import PostService from "../postService/PostService";
import {Button, message, Modal, Select} from "antd";
import TaskForm from "./TaskForm";
import OffersPage from "./OffersPage";

const TasksPage: React.FC = () => {
    const [activeIndexes, setActiveIndexes] = useState<number[]>([]);
    const [tasks, setTasks] = useState<any[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [subjects, setSubjects] = useState<any[]>(['']);
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null); // Стейт для выбранного предмета
    const [showMyTasks, setShowMyTasks] = useState(false); // Стейт для отображения задач, созданных текущим пользователем

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            message.warning('Чтобы посмотреть задачи необходимо авторизоваться.');
            return;
        }

        PostService.getAllSubjects().then((response: any) => {
            setSubjects(response.data);
        });

        PostService.getTasks(token).then((response: any) => {
            setTasks(response.data);
        });
    }, []);

    const filterTasksBySubject = (task: any) => {
        if (!selectedSubject) return true;
        return task.subjectName === selectedSubject;
    };

    const filterTasksByCurrentUser = (task: any) => {
        return !showMyTasks || task.createByCurrentUser;
    };
    const filterCloseTasks = (tasks:any) => {
        return !tasks.isClose;
    }
    const handleChangeSubject = (value: string) => {
        setSelectedSubject(value === '' ? null : value);
    };

    const handleAccordionClick = (index: number) => {
        const indexExists = activeIndexes.includes(index);
        setActiveIndexes((prevIndexes) =>
            indexExists ? prevIndexes.filter((prevIndex) => prevIndex !== index) : [...prevIndexes, index]
        );
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleAddTask = (values: any) => {
        const {title, description, startPrice, subjectName} = values;
        const token = localStorage.getItem('token');

        if (!token) {
            message.warning('Чтобы добавить задачу необходимо авторизоваться.');
            return;
        }

        PostService.createTask(title, description, startPrice, subjectName, token)
            .then((response: any) => {
                setTasks([...tasks, response.data]);
                message.success('Задача успешно добавлена.');
                closeModal();
            })
            .catch(error => {
                console.error('Ошибка при добавлении задач:', error);
                message.error('Ошибка при добавлении задачи. Пожалуйста, попробуйте еще раз.');
            });
    };



    return (
        <div>
            <div style={{marginBottom: '25px', display: 'flex', alignItems: 'center'}}>
                <Button type="primary" onClick={showModal} style={{marginRight: '15px'}}>
                    Добавить новую задачу
                </Button>
                <Select
                    placeholder="Фильтр по предмету"
                    style={{width: 200}}
                    value={selectedSubject}
                    onChange={(value) => handleChangeSubject(value)}
                >
                    <Select.Option key="empty" value="" style={{opacity: "0.5"}}>{"Не выбрано"}</Select.Option>
                    {subjects.map((subject, index) => (
                        <Select.Option key={index} value={subject.name}>{subject.name}</Select.Option>
                    ))}
                </Select>
                <Button
                    style={{marginLeft: '15px', backgroundColor: showMyTasks ? 'red' : 'green', color: 'white'}}
                    onClick={() => setShowMyTasks(!showMyTasks)}
                >
                    {showMyTasks ? 'Все задачи' : 'Мои задачи'}
                </Button>
            </div>

            <Modal
                title="Добавить новую задачу"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <TaskForm onFinish={handleAddTask}/>
            </Modal>

            {tasks.filter(filterCloseTasks).filter(filterTasksBySubject).filter(filterTasksByCurrentUser).map((task, index) => (
                <div key={index}>
                    <button
                        className={`accordion ${activeIndexes.includes(index) ? "active" : ""}`}
                        onClick={() => handleAccordionClick(index)}
                    >
                        {task.title}
                        <span className="your-task" style={{marginRight: '20px'}}>
                             {task.createByCurrentUser && "Ваша задача"}
                        </span>
                        <i className="fas fa-angle-down"></i>
                    </button>
                    <div className="panel" style={{
                        display: activeIndexes.includes(index) ? "block" : "none",
                        backgroundColor: " #e0e0e0"
                    }}>
                        <p style={{marginBottom: "20px"}}>Описание: {task.description}</p>
                        <p style={{marginBottom: "20px"}}>Стартовая цена: {task.startPrice}</p>
                        <p style={{marginBottom: "20px"}}>Предмет: {task.subjectName}</p>
                        <OffersPage taskId={task.id} createByCurrentUser={task.createByCurrentUser} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TasksPage;
