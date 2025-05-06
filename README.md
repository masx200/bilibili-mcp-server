# bilibili MCP Server

[![MIT licensed][badge-license]][url-license]
[![NPM version][badge-npm-version]][url-npm]
[![NPM Unpacked Size (with version)](https://img.shields.io/npm/unpacked-size/rolldown/latest?label=npm)][url-npm]

> _Model Context Protocol ([MCP](https://modelcontextprotocol.io/introduction)) Server for [bilibili.com](https://www.bilibili.com)._

## Demo

- [ ] TODO

## Features

### User Info

- [x] Get user information
- [ ] Search videos

## Usage

### Claude Desktop

> Refer to the official [documentation](https://modelcontextprotocol.io/quickstart/server#testing-your-server-with-claude-for-desktop-2)

config for npm (recommended)

```json
{
  "mcpServers": {
    "bilibili": {
      "command": "npx",
      "args": ["-y", "@wangshunnn/bilibili-mcp-server"]
    }
  }
}
```

_**or**_

config for local cloned repo

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
  <img src="./images/claude-desktop-1.png" alt="" width="500">
  <img src="./images/claude-desktop-2.png" alt="" width="500">
</div>

## Local Development

1. Install dependencies

```sh
pnpm i
```

2. build

```sh
pnpm build
# or
pnpm dev
```

3. debug for local repo, see [above](#usage).

## Publishing

To publish a new version to npm:

```sh
# For patch version update (0.0.x)
pnpm publish:patch

# For minor version update (0.x.0)
pnpm publish:minor

# For major version update (x.0.0)
pnpm publish:major
```

These commands will automatically:

1. Bump the version in package.json
2. Build the project
3. Publish to npm registry

## Credits

- [bili-api]

[url-license]: https://github.com/wangshunnn/bilibili-mcp-server/blob/main/LICENSE
[url-npm]: https://www.npmjs.com/package/@wangshunnn/bilibili-mcp-server
[bili-api]: https://github.com/simon300000/bili-api
