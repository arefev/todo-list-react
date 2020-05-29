export default class ApiService {

    _apiBase = 'http://todo-list-lumen.lo/api';

    getResource = async (url, method, params) => {

        let settings = {
            method
        };

        if (method !== 'GET' && method !== 'HEAD') {
            settings.body = JSON.stringify(params)
        }

        const res = await fetch(`${this._apiBase}${url}`, settings);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    };

    post = async (url, params) => {
        return await this.getResource(url, 'POST', params);
    };

    update = async (url, params) => {
        return await this.getResource(url, 'PUT', params);
    };

    get = async (url) => {
        return await this.getResource(url, 'GET', {});
    };

    delete = async (url, params) => {
        return await this.getResource(url, 'DELETE', params);
    };

    patch = async (url, params) => {
        return await this.getResource(url, 'PATCH', params);
    };

    getItems = async () => {
        const res = await this.get(`/items`);
        return res.data;
    };

    saveItem = async (label) => {
        const res = await this.post(`/items`, {label});
        return res;
    };

    deleteItem = async (id) => {
        const res = await this.delete(`/items/${id}`, {});
        return res;
    };

    important = async (id) => {
        const res = await this.patch(`/items/${id}/important`, {});
        return res;
    };

    done = async (id) => {
        const res = await this.patch(`/items/${id}/done`, {});
        return res;
    };
}
