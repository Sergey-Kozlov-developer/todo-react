import type { ITask } from "../context/useTaskState";

export class ApiService {
    static #apiUrl = import.meta.env.VITE_APP_REMOTE_SERVER;
    // для пагинации и получении всех todo
    static async getTotalTasks(page: number = 1, itemsPerPage = 8) {
        try {
            const skip = (page - 1) * itemsPerPage;
            const baseUrl = this.#apiUrl;
            const url = `${baseUrl}?limit=${itemsPerPage}&skip=${skip}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(
                    `Ошибка получения страниц из API: ${response.status}`
                );
            }
            const pageApi = await response.json();
            return pageApi || [];
        } catch (error) {
            console.error("Ошибка при получении страниц ", error);
        }
    }

    // update task при клике на чекбокс
    static async update(task: Omit<ITask, "id" & "userId" & "isTemp">) {
        try {
            const response = await fetch(`${this.#apiUrl}/${task.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...task,
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
    static async addTask(task: ITask) {
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
            console.error(error);
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
