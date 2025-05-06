# Bilibili MCP Server

> 一个基于 Model Context Protocol (MCP) 的 Bilibili Server

## Demo

- [ ] TODO

## Features

### 用户相关

- `get_user_info`: 获取用户的个人资料信息

## Usage

### Claude Desktop

> Refer: https://modelcontextprotocol.io/quickstart/server#testing-your-server-with-claude-for-desktop-2

```json
// config for npm (recommend)
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

```json
// 1. git clone
// 2. config for local cloned repo
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

> 保存配置，重启后能看到新增的 Bilibili MCP 选项，如下图：

<div align="center">
  <img src="./images/claude-desktop-1.png" alt="" width="600">
  <img src="./images/claude-desktop-2.png" alt="" width="600">
</div>

### Cursor

- [ ] TODO
