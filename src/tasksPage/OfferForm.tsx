import React from "react";
import {Form, Input, Button} from "antd";

const OfferForm: React.FC<{ taskId: any; onFinish: (values: any) => void }> = ({taskId, onFinish}) => {
    const [form] = Form.useForm();

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            form={form}
            name="offerForm"
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Сумма предложения"
                name="price"
                rules={[{required: true, message: "Пожалуйста, введите сумму!"}]}
                style={{marginTop: "20px"}}
            >
                <Input type="number" min={0}/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Отправить предложение
                </Button>
            </Form.Item>
        </Form>
    );
};

export default OfferForm;
