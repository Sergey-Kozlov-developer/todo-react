export class ApiService {
    static apiUrl = import.meta.env.VITE_APP_REMOTE_SERVER;

    static async getTodoList() {
        return await fetch(this.apiUrl)
            .then((res) => res.json())
            .then((data) => {
                const todos = data;
                console.log(todos);

                return todos;
            });
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
