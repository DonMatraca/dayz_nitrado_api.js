const fetch = require('node-fetch');

class NitradoAPI {
    constructor(apiToken) {
        this.apiToken = apiToken;
        this.baseUrl = 'https://api.nitrado.net';
    }

    async _makeRequest(method, endpoint, body = null) {
        const url = `${this.baseUrl}${endpoint}`;
        const options = {
            method,
            headers: {
                'Authorization': `Bearer ${this.apiToken}`,
                'Content-Type': 'application/json'
            }
        };
        
        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    async getServerDetails(nitradoId) {
        return await this._makeRequest('GET', `/services/${nitradoId}/gameservers`);
    }

    async restartServer(nitradoId) {
        return await this._makeRequest('POST', `/services/${nitradoId}/gameservers/restart`);
    }

    async stopServer(nitradoId) {
        return await this._makeRequest('POST', `/services/${nitradoId}/gameservers/stop`);
    }

    async manageList(nitradoId, action, listType, members) {
        if (!["whitelist", "bans", "priority"].includes(listType)) {
            throw new Error("Invalid list type. Use 'whitelist', 'bans', or 'priority'.");
        }

        const currentList = await this._makeRequest('GET', `/services/${nitradoId}/gameservers/settings`);
        const listValue = currentList.data.gameserver.settings.general[listType] || "";
        const currentMembers = new Set(listValue.split("\r"));

        let updatedMembers;
        if (action === "add") {
            updatedMembers = new Set([...currentMembers, ...members]);
        } else if (action === "remove") {
            updatedMembers = new Set([...currentMembers].filter(member => !members.includes(member)));
        } else {
            throw new Error("Invalid action. Use 'add' or 'remove'.");
        }

        const updatedListValue = Array.from(updatedMembers).join("\r");
        const data = {
            category: "general",
            key: listType,
            value: updatedListValue
        };

        return await this._makeRequest('POST', `/services/${nitradoId}/gameservers/settings`, data);
    }
}

module.exports = NitradoAPI;
