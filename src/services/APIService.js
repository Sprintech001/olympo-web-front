export default class APIService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async request(endpoint, method = 'GET', data = null, headers = {}) {
        const config = {
            method,
            headers: { 'Content-Type': 'application/json', ...headers },
            body: data ? JSON.stringify(data) : null
        };

        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, config);
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Erro na requisição');
            return result;
        } catch (error) {
            console.error('Erro na API:', error.message);
            throw error;
        }
    }

    get(endpoint, headers = {}) { return this.request(endpoint, 'GET', null, headers); }
    post(endpoint, data, headers = {}) { return this.request(endpoint, 'POST', data, headers); }
    put(endpoint, data, headers = {}) { return this.request(endpoint, 'PUT', data, headers); }
    delete(endpoint, headers = {}) { return this.request(endpoint, 'DELETE', null, headers); }
}
