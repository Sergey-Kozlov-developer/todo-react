import type { ITask } from "../context/useTaskState";

export class ApiService {
    static apiUrl = import.meta.env.VITE_APP_REMOTE_SERVER;
    // получение задач
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

    // update task при клике на чекбокс
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

    // добавление задач
    static async onAddTask(task: ITask) {
        try {
            const response = await fetch(`${this.apiUrl}/${task}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    todo: "Use DummyJSON in the project",
                    completed: !task.completed,
                    userId: task.id,
                }),
            });
            if (!response.ok) {
                throw new Error(`Ошибка добавления: ${response.status}`);
            }
            const addTask = await response.json();
            return addTask;
        } catch (error) {
            console.error("Ошибка добавления задачи: ", error);
            throw error;
        }
    }

    // Удаление задач
    static async onDelete(id: number) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Ошибка удаления: ${response.status}`);
            }
            const deleteTask = await response.json();
            return deleteTask;
        } catch (error) {
            console.error("Ошибка удаления задачи: ", error);
            throw error;
        }
    }
}
