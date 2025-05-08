import { getToken } from "../storage/AuthStorage";

export class ApiMethods {
    static async request<T>(method: string, url: string, data?: any): Promise<T> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            
        };

        if(!url.includes("auth")) {
            const token = await getToken();
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            method,
            headers,
            body: data ? JSON.stringify(data) : undefined
        });

        console.log(response);

        if(!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return response.json() as Promise<T>;
    }

    static get<T>(url: string): Promise<T> {
        return this.request<T>('GET', url);
    }

    static async post<T>(url: string, data: unknown): Promise<T> {
        return this.request<T>('POST', url, data);
    }

    static put<T>(url: string, data: Record<string, unknown>): Promise<T> {
        return this.request<T>('PUT', url, data);
    }

    static delete<T>(url: string): Promise<T> {
        return this.request<T>('DELETE', url);
    }
}