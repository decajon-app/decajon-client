export class ApiMethods {
    static async request<T>(method: string, url: string, data?: any): Promise<T> {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : undefined
        })

        if(!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return response.json() as Promise<T>;
    }

    static get<T>(url: string): Promise<T> {
        return this.request<T>('GET', url);
    }

    static async post<T>(url: string, data: unknown): Promise<T> {
        return this.request('POST', url, data);
    }

    static put<T>(url: string, data: Record<string, unknown>): Promise<T> {
        return this.request('PUT', url, data);
    }

    static delete<T>(url: string): Promise<T> {
        return this.request('DELETE', url);
    }
}