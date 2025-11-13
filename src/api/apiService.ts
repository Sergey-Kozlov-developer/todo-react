import type { ITask } from "../context/useTaskState";

export class ApiService {
    static #apiUrl = import.meta.env.VITE_APP_REMOTE_SERVER;
    // метод проверки API на массив объектов
    static getApiUrl() {
        // Если это массив, берем первый элемент или возвращаем дефолтный URL
        if (Array.isArray(this.#apiUrl)) {
            console.warn("apiUrl is array, using default URL");
            return this.#apiUrl;
        }
        return this.#apiUrl;
    }
    // для пагинации и получении всех todo
    static async getTotalTasks() {
        try {
            const url = this.#apiUrl;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(
                    `Ошибка получения страниц из API: ${response.status}`
                );
            }

            const pageApi = await response.json();

            return pageApi;
        } catch (error) {
            console.error("Ошибка при получении страниц ", error);
        }
    }

    // update task при клике на чекбокс
    static async update(task: ITask) {
        try {
            const response = await fetch(`${this.#apiUrl}/${task.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    todo: task.todo,
                    completed: task.completed,
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
            const response = await fetch(`${this.#apiUrl}/${task}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ task }),
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
            const response = await fetch(`${this.#apiUrl}/${id}`, {
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
