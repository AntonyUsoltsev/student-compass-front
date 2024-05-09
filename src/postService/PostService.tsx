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

    static async getTasks() {
        console.log(`http://localhost:8080/student_compass/tasks`)
        try {
            const value = await axios.get(`http://localhost:8080/student_compass/tasks`);
            console.log(value)
            return value;
        } catch (error) {
            this.errorHandler(error);
        }
    }

    static async getAllSubjects() {
        console.log(`http://localhost:8080/student_compass/`)
        try {
            const value = await axios.get(`http://localhost:8080/student_compass/`);
            console.log(value)
            return value;
        } catch (error) {
            this.errorHandler(error);
        }
    }
    static async createTask() {
        console.log(`http://localhost:8080/student_compass/create_task`)
        try {
            const value = await axios.put(`http://localhost:8080/student_compass/create_task`);
            console.log(value)
            return value;
        } catch (error) {
            this.errorHandler(error);
        }
    }
}