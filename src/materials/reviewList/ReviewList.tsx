import React, {useEffect, useState} from 'react';
import {List, Avatar, Button, message} from 'antd';
import "./ReviewStyle.css"
import TextArea from "antd/es/input/TextArea";
import PostService from "../../postService/PostService";

const ReviewList = ({selectedSubject, selectedSubjectName, inputReviews}: any) => {
    const [reviews, setReviews] = useState([]);
    const [newReviewText, setNewReviewText] = useState('');

    useEffect(() => {
        console.log(inputReviews)
        setReviews(inputReviews)
    }, [selectedSubject]);
    const handleReviewSubmit = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            message.warning('Чтобы оставить отзыв, необходимо авторизоваться.');
            return;
        }
        PostService.postReview(selectedSubject, token, newReviewText).then(response => {
            // @ts-ignore
            setReviews([...reviews, response.data.reviews[0]]);
            setNewReviewText('');
            message.success('Отзыв успешно добавлен.');
        })
            .catch(error => {
                console.error('Ошибка при добавлении отзыва:', error);
                message.error('Ошибка при добавлении отзыва. Пожалуйста, попробуйте еще раз.');
            });
    };


    return (
        <div>
            <header className="reviews-header">Отзывы по предмету {selectedSubjectName}</header>
            <div style={{marginBottom: '16px'}}>
                <TextArea
                    rows={4}
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="Введите ваш отзыв"
                />
                <Button type="primary" onClick={handleReviewSubmit} style={{marginTop: '8px'}}>
                    Оставить отзыв
                </Button>
            </div>
            <List
                itemLayout="horizontal"
                dataSource={reviews}
                renderItem={(review: any) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar>{review.user.firstName.charAt(0)}</Avatar>}
                            title={review.user.firstName + " " + review.user.lastName}
                            description={review.value}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};


export default ReviewList;
