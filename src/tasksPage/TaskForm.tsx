import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import PostService from "../postService/PostService";

const { Option } = Select;

const TaskForm = ({ onFinish }: any) => {
    const [form] = Form.useForm();
    const [subjects, setSubjects] = useState<any[]>([]);

    useEffect(() => {
        PostService.getAllSubjects().then((response: any) => {
            setSubjects(response.data);
        });
    }, []);


    const handleFormSubmit = (values: any) => {
        form.resetFields();
        onFinish(values);
    };

    return (
        <Form
            name="addTask"
            onFinish={handleFormSubmit}
            form={form}
        >
            <Form.Item
                name="title"
                rules={[{ required: true, message: 'Пожалуйста, введите заголовок' }]}
            >
                <Input placeholder="Введите заголовок" />
            </Form.Item>
            <Form.Item
                name="description"
                rules={[{ required: true, message: 'Пожалуйста, введите описание' }]}
            >
                <Input placeholder="Введите описание" />
            </Form.Item>
            <Form.Item
                name="startPrice"
                rules={[{ required: true, message: 'Пожалуйста, введите стартовую цену' }]}
            >
                <Input placeholder="Введите стартовую цену" />
            </Form.Item>
            <Form.Item
                name="subjectName"
                rules={[{ required: true, message: 'Пожалуйста, выберите предмет' }]}
            >
                <Select placeholder="Выберите предмет">
                    {subjects.map((subject, index) => (
                        <Option key={index} value={subject.name}>{subject.name}</Option>
                    ))}
                </Select>
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
