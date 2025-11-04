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
    static async update(task: ITask) {
        try {
            const response = await fetch(`${this.apiUrl}/${task.id}`, {
                method: "PUT" /* or PATCH */,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    completed: !task.completed,
                }),
            });
            if (!response.ok) {
                throw new Error(`Ошибка обновления: ${response.status}`);
            }
            const updateTask = await response.json();
            return updateTask;
        } catch (error) {
            console.error("Ошибка обновления задачи: ", error);
            throw error;
        }
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
