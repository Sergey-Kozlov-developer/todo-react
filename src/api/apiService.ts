import type { ITask } from "../context/useTaskState";

export class ApiService {
    static apiUrl = import.meta.env.VITE_APP_REMOTE_SERVER;

    static async getTodoList(): Promise<ITask[]> {
        try {
            const response = await fetch(this.apiUrl);

            if (!response.ok) {
                throw new Error(`Ошибка подключения к API: ${response.status}`);
            }
            // сохраняем ответ сервера
            const dataApi = await response.json();

            return dataApi.todos;
        } catch (error) {
            console.error("Ошибка при получении todos ", error);
            throw error;
        }
    }

    // update tsk при клике на чекбокс
    static async update() {
        /* updating completed status of todo with id 1 */
        fetch("https://dummyjson.com/todos/1", {
            method: "PUT" /* or PATCH */,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                completed: false,
            }),
        })
            .then((res) => res.json())
            .then(console.log);
    }

    // DELETE
    static async onDelete(id: number) {
        return await fetch(`${this.apiUrl}/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(console.log);
    }
}
