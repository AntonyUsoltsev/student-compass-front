import React from 'react';
import {Button, Form, Input, message} from 'antd';
import PostService from "../postService/PostService";

const RegisterForm = ({onRegistrationSuccess}: any) => {
    const onFinish = (values: any) => {
        PostService.postRegister(values).then((response: any) => {
            localStorage.setItem('token', response.data.token);
            // Вызовите колбэк для закрытия модального окна
            const username = values.firstname;
            onRegistrationSuccess(username);
            console.log('Успешная регистрация:', response.data);
            message.success('Успешная регистрация');
        })
            .catch((error) => {
                console.error('Ошибка регистрации:', error);
                message.error('Ошибка регистрации. Проверьте введенные данные.');
            });
    };

    return (
        <Form onFinish={onFinish}>
            <Form.Item name="firstname" rules={[{required: true, message: 'Введите Имя'}]}>
                <Input placeholder="Имя"/>
            </Form.Item>
            <Form.Item name="lastname" rules={[{required: true, message: 'Введите Фамилию'}]}>
                <Input placeholder="Фамилия"/>
            </Form.Item>
            <Form.Item name="email" rules={[{required: true, message: 'Введите адрес эл. почты'}]}>
                <Input placeholder="Эл. почта"/>
            </Form.Item>
            <Form.Item name="password" rules={[{required: true, message: 'Введите пароль'}]}>
                <Input.Password placeholder="Пароль"/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Зарегистрироваться
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;
