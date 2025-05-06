# bilibili MCP Server

> Model Context Protocol (MCP) Server for [bilibili](https://www.bilibili.com) API

## Demo

- [ ] TODO

## Features

### User Info

- `get_user_info`: get user infomation

## Usage

### Claude Desktop

> Refer to the official [documentation](https://modelcontextprotocol.io/quickstart/server#testing-your-server-with-claude-for-desktop-2)

config for npm (recommended)

```json
{
  "mcpServers": {
    "bilibili": {
      "command": "npx",
      "args": ["-y", "@jojojs/bilibili-mcp-server"]
    }
  }
}
```

_**or**_

git clone & config for local cloned repo

```json
{
  "mcpServers": {
    "bilibili": {
      "command": "node",
      "args": [
        "/ABSOLUTE/PATH/TO/PARENT/FOLDER/bilibili-mcp-server/dist/index.js"
      ]
    }
  }
}
```

Save the configuration and restart. You will see the new Bilibili MCP option as shown below:

<div align="center">
  <img src="./images/claude-desktop-1.png" alt="" width="600">
  <img src="./images/claude-desktop-2.png" alt="" width="600">
</div>
