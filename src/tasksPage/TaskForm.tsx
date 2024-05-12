import React, {useState} from 'react';
import {Button, Form, Input} from 'antd';

const TaskForm = ({onFinish}: any) => {
    const [form] = Form.useForm();
    const [subjects, setSubjects] = useState<any[]>([]);

    //TODO:
    // useEffect(() => {
    //     PostService.getAllSubjects().then((response: any) => {
    //         setSubjects(response.data);
    //     });
    // }, []);


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
                < Input placeholder="Введите заголовок"/>
            </Form.Item>
            <Form.Item
                name="description"
                rules={[{required: true, message: 'Пожалуйста, введите описание'}]}
            >
                < Input placeholder="Введите описание"/>
            </Form.Item>
            <Form.Item
                name="price"
                rules={[{required: true, message: 'Пожалуйста, введите стартовую цену'}]}
            >
                < Input placeholder="Введите стартовую цену"/>
            </Form.Item>
            <Form.Item
                name="subject"
                rules={[{required: true, message: 'Пожалуйста, введите предмет'}]}
            >
                < Input placeholder="Введите название предмета"/>
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
