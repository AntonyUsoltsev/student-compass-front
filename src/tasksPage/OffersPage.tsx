import React, {useEffect, useState} from "react";
import PostService from "../postService/PostService";

const OffersPage: React.FC<{ taskId: any }> = (props) => {
    const {taskId} = props;
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        console.log(`find offers for task ${taskId}`);
        PostService.getOffersForTask(taskId).then((response: any) => {
            setOffers(response.data);
        });
    }, [taskId]);

    return (
        <div>
            <h3 style={{marginBottom: "10px", marginTop: "30px"}}>Предложения:</h3>
            {offers.length === 0 ? (
                <p>Предложений пока нет</p>
            ) : (
                <ul>
                    {offers.map((offer: any, index: number) => (
                        <li key={index} style={{marginTop: "20px"}}>
                            {offer.user.firstName} {offer.user.lastName} - готов сделать за {offer.price} рублей
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OffersPage;
