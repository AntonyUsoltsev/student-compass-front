import React, {useEffect, useState} from "react";
import PostService from "../postService/PostService";
import OfferForm from "./OfferForm";
import {Button, message} from "antd";

const OffersPage: React.FC<{ task: any; createByCurrentUser: boolean }> = (
    props
) => {
    const {task, createByCurrentUser} = props;
    const [offers, setOffers] = useState<any[]>([]);
    const [showOfferForm, setShowOfferForm] = useState(false);

    useEffect(() => {
        PostService.getOffersForTask(task.id).then((response: any) => {
            setOffers(response.data);
        });
    }, [task]);

    const handleShowOfferForm = () => {
        setShowOfferForm(true);
    };

    const handleCloseOfferForm = (values: any) => {
        setShowOfferForm(false);
        const {price} = values;
        const token = localStorage.getItem("token");

        if (!token) {
            message.warning(
                "Необходимо авторизоваться для оставления предложения."
            );
            return;
        }

        PostService.createOffer(task.id, price, token)
            .then((response: any) => {
                setOffers([...offers, response.data]);
                message.success("Предложение успешно отправлено.");
            })
            .catch((error: any) => {
                console.error("Ошибка при отправке предложения:", error);
                message.error(
                    "Ошибка при отправке предложения. Пожалуйста, попробуйте еще раз."
                );
            });
    };

    const handleSelectExecutor = (offer: any) => {
        const token = localStorage.getItem("token");

        if (!token) {
            message.warning("Необходимо авторизоваться для выбора исполнителя.");
            return;
        }

        PostService.closeTask(task.id, token)
            .then((response: any) => {
                console.log(response);
                PostService.createChat(task.title, offer.user.id, token).then();
                message.success("Исполнитель выбран успешно. Создан чат");
            })
            .catch((error: any) => {
                console.error("Ошибка при выборе исполнителя:", error);
                message.error(
                    "Ошибка при выборе исполнителя. Пожалуйста, попробуйте еще раз."
                );
            });
    };

    return (
        <div>
            <h3 style={{marginBottom: "10px", marginTop: "30px"}}>Предложения:</h3>
            {offers.length === 0 ? (
                <p>Предложений пока нет</p>
            ) : (
                <ul>
                    {offers.map((offer: any, index: number) => (
                        <li key={index} style={{marginTop: "20px"}}>
                            {offer.user.firstName} {offer.user.lastName} - готов сделать за{" "}
                            {offer.price} рублей
                            {createByCurrentUser && (
                                <Button
                                    type="primary"
                                    style={{marginLeft: "10px"}}
                                    onClick={() => handleSelectExecutor(offer)}
                                >
                                    Выбрать этого исполнителя
                                </Button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
            {!createByCurrentUser && !showOfferForm && (
                <div style={{marginTop: "20px"}}>
                    <Button type="primary" onClick={handleShowOfferForm}>
                        Оставить предложение
                    </Button>
                </div>
            )}
            {showOfferForm && (
                <OfferForm taskId={task.id} onFinish={handleCloseOfferForm}/>
            )}
        </div>
    );
};

export default OffersPage;
