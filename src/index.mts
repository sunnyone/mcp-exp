import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "mcp-exp",
  version: "0.0.1"
});

server.tool("write",
  { text: z.string() },
  async ({ text }) => {
    return {
        content: [{ type: "text", text }]
    };
  }
);

server.resource(
  "mcpexp",
  new ResourceTemplate("mcpexp://{name}", { list: undefined }),
  async (uri, {name}) => {
    return { contents: [{
      uri: uri.href,
      text: `Hello ${name}`
    }]};
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
