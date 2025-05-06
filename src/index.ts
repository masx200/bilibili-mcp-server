#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
// import { registerVideoTools } from "./tools/video.js"
// import { registerSearchTools } from "./tools/search.js"
import { registerUserTools } from "./tools/user.js"

const server = new McpServer({
  name: "bilibili-mcp",
  version: "1.0.0",
})

async function main() {
  //   registerVideoTools(server)
  //   registerSearchTools(server)
  registerUserTools(server)

  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error("Bilibili MCP Server running on stdio")
}

main().catch((error) => {
  console.error("Fatal error in main():", error)
  process.exit(1)
})
