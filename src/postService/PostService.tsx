import axios from "axios";

export default class PostService {
    static errorHandler(error: any) {
        if (error.response) {
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
        } else if (error.request) {
            console.error(error.request);
        } else {
            console.error('Error', error.message);
        }
    }

    static async getUniversities(tableId: any) {
        console.log("tableId" + tableId)
        try {
            const value = await axios.get("http://localhost:8080/student_compass");
            console.log(value)
            return value;
        } catch (error) {
            this.errorHandler(error);
        }
    }

    static async getCourses(universityName: any) {
        console.log(`http://localhost:8080/student_compass/${universityName}`)
        try {
            const value = await axios.get(`http://localhost:8080/student_compass/${universityName}`);
            console.log(value)
            return value;
        } catch (error) {
            this.errorHandler(error);
        }
    }

    static async getSubjects(universityName: string, courseValue: string) {
        console.log(`http://localhost:8080/student_compass/${universityName}/${courseValue}`)
        try {
            const value = await axios.get(`http://localhost:8080/student_compass/${universityName}/${courseValue}`);
            console.log(value)
            return value;
        } catch (error) {
            this.errorHandler(error);
        }
    }

    static async getBooks(universityName: any, courseValue: any, selectedSubject: any) {
        console.log(`http://localhost:8080/student_compass/${universityName}/${courseValue}/${selectedSubject}`)
        try {
            const value = await axios.get(`http://localhost:8080/student_compass/${universityName}/${courseValue}/${selectedSubject}`);
            console.log(value)
            return value;
        } catch (error) {
            this.errorHandler(error);
        }
    }

    static async postAuth(values: any) {
        console.log(`http://localhost:8080/auth/student_compass/authenticate`)
        try {
            const value = await axios.post(`http://localhost:8080/auth/student_compass/authenticate`, values);
            console.log(value)
            return value;
        } catch (error) {
            this.errorHandler(error);
        }
    }

    static async postRegister(values: any) {
        console.log(`http://localhost:8080/auth/student_compass/register`)
        try {
            const value = await axios.post(`http://localhost:8080/auth/student_compass/register`, values);
            console.log(value)
            return value;
        } catch (error) {
            this.errorHandler(error);
        }
    }


    static async postReview(selectedSubject: any, token: any, newReviewText: any) {
        try {
            const value = await axios.post(`http://localhost:8080/auth/review/${selectedSubject}`, {
                text: newReviewText,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log(value)
            return value;
        } catch (error) {
            this.errorHandler(error);
        }

    }

    static async postMaterial(author: any, name: any, link: any, token: any, subject: any) {
        console.log(`http://localhost:8080/auth/material/${subject}`)
        try {
            const value = await axios.put(`http://localhost:8080/auth/material/${subject}`, {
                author: author,
                name: name,
                link: link,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(value)
            return value;
        } catch (error) {
            this.errorHandler(error);
        }
    }

    static async getTasks(token: any) {
        console.log(`http://localhost:8080/student_compass/tasks`)
        try {
            const value = await axios.get(`http://localhost:8080/student_compass/tasks`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(value)
            return value;
        } catch (error) {
            this.errorHandler(error);
        }
    }

    static async getAllSubjects() {
        console.log(`http://localhost:8080/student_compass/get_subjects`)
        try {
            const value = await axios.get(`http://localhost:8080/student_compass/get_subjects`);
            console.log(value)
            return value;
        } catch (error) {
            this.errorHandler(error);
        }
    }


    static async createTask(title: any, description: any, startPrice: any, subject: any, token: any) {
        console.log(`http://localhost:8080/student_compass/create_task`, title, description, startPrice, subject)
        try {
            const value = await axios.put(`http://localhost:8080/student_compass/create_task`, {
                title: title,
                description: description,
                startPrice: startPrice,
                subjectName: subject
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(value)
            return value;
        } catch (error) {
            this.errorHandler(error);
        }
    }

    static async getOffersForTask(taskId: any) {
        console.log(`http://localhost:8080/student_compass/get_offers?taskId=${taskId}`)
        try {
            const value = await axios.get(`http://localhost:8080/student_compass/get_offers?taskId=${taskId}`);
            console.log(value)
            return value;
        } catch (error) {
            this.errorHandler(error);
        }
    }

    static async createOffer(taskId: any, price: any, token: string) {
        console.log(`http://localhost:8080/student_compass/task/add_offer?taskId=${taskId}&price=${price}`)
        try {
            const value = await axios.post(`http://localhost:8080/student_compass/task/add_offer?taskId=${taskId}&price=${price}`,
                {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            console.log(value)
            return value;
        } catch (error) {
            this.errorHandler(error);
        }
    }

    static async getChats(token: string) {
        console.log(`http://localhost:8080/chat/all`)
        try {
            const value = await axios.get(`http://localhost:8080/chat/all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(value)
            return value;
        } catch (error) {
            this.errorHandler(error);
        }
    }


    static async getLastMessages(id: any, token: string) {
        console.log(`http://localhost:8080/chat/all`)
        try {
            const value = await axios.get(`http://localhost:8080/chat?chatId=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(value)
            return value;
        } catch (error) {
            this.errorHandler(error);
        }
    }

    static async putMessage(id: any, token: string, text: any) {
        console.log(`http://localhost:8080/chat/all`)
        try {
            const value = await axios.put(`http://localhost:8080/chat`,
                {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            console.log(value)
            return value;
        } catch (error) {
            this.errorHandler(error);
        }
    }


}