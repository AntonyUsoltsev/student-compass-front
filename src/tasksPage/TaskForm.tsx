import React, {useEffect, useState} from 'react';
import {Form, Input, Button} from 'antd';
import PostService from "../postService/PostService";

const TaskForm = ({onFinish}:any) => {
    const [form] = Form.useForm();
    const [subjects, setSubjects] = useState<any[]>([]);

    useEffect(() => {
        PostService.getSubjects().then((response: any) => {
            setSubjects(response.data);
        });
    }, []);


    return (
        <Form
            name="addTask"
            onFinish={onFinish}
            form={form}
        >
            <Form.Item
                name="title"
                rules={[{required: true, message: 'Пожалуйста, введите заголовок'}]}
            >
                < Input placeholder="Введите автора"/>
            </Form.Item>
            <Form.Item
                name="description"
                rules={[{required: true, message: 'Пожалуйста, введите описание'}]}
            >
                < Input placeholder="Введите название"/>
            </Form.Item>
            <Form.Item
                name="price"
                rules={[{required: true, message: 'Пожалуйста, введите стартовую цену'}]}
            >
                < Input placeholder="Введите ссылку для просмотра материала"/>
            </Form.Item>
            <Form.Item
                name="subject"
                rules={[{required: true, message: 'Пожалуйста, введите предмет'}]}
            >
                < Input placeholder="Введите ссылку для просмотра материала"/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Добавить задачу
                </Button>
            </Form.Item>
        </Form>
    );
};

export default TaskForm;
