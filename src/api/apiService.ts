export class ApiService {
    static apiUrl = import.meta.env.VITE_APP_REMOTE_SERVER;

    static async getTodoList(): Promise<{
        todos: Array<{
            id: number;
            todo: string;
            completed: boolean;
            userId: number;
        }>;
        total: number;
        limit: number;
    }> {
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

    // DELETE
    static async onDelete(id: number) {
        return await fetch(`${this.apiUrl}/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(console.log);
    }
}
