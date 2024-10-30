# DayZ Nitrado API

A JavaScript module to interact with the Nitrado API specifically for managing DayZ game servers. This module simplifies common server management tasks, including handling whitelists, restarting the server, and managing configuration files.

## Features

- Retrieve server details
- Restart and stop the server
- Manage player lists (whitelist, banlist, priority list)
- Handle configuration files (upload, download, validate)
- Schedule automatic restarts
- Easy and extensible setup

## Requirements

This module requires Node.js and includes the `node-fetch` and `form-data` libraries as dependencies, so they will install automatically.

## Installation

To install directly from npm:

```bash
npm install dayz_nitrado_api
```
## Basic Usage

Here's an example to get started with the module:

```javascript
const NitradoAPI = require('dayz_nitrado_api');

async function main() {
    const apiToken = 'YOUR_NITRADO_TOKEN';
    const nitradoId = 'YOUR_SERVER_ID';

    const nitradoApi = new NitradoAPI(apiToken);

    try {
        // Retrieve server details
        const serverDetails = await nitradoApi.getServerDetails(nitradoId);
        console.log('Server Details:', serverDetails);

        // Restart the server
        const restartResponse = await nitradoApi.restartServer(nitradoId);
        console.log('Server Restart:', restartResponse);

        // Add users to the whitelist
        const manageListResponse = await nitradoApi.manageList(nitradoId, 'add', 'whitelist', ['User1', 'User2']);
        console.log('Manage List Response:', manageListResponse);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();
```
## Function Documentation

```javascript
NitradoAPI(apiToken)
```
- Initializes the module with the Nitrado API token.

## Main Methods

- getServerDetails(nitradoId): Retrieves details for the specified server.
- restartServer(nitradoId): Restarts the server.
- stopServer(nitradoId): Stops the server.
- manageList(nitradoId, action, listType, members): Manages the whitelist, banlist, or priority list to add or remove players.

## Contributions
- Contributions are welcome this is a first stage of developement and lots of things can fail to work. If you find an issue or have a suggestion, please open an issue or make a pull request on the GitHub repository or contact me on Discord as DonMatraca#2756.

## License

- This project is licensed under the MIT License. For more information, see the LICENSE file.

## Author: DonMatraca