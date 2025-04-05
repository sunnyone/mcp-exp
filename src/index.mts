import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getTmpFiles, writeTmpFile } from "./tmpFiles.js";

const server = new McpServer({
  name: "mcp-exp",
  version: "0.0.1"
});

server.tool("write",
  { name: z.string().regex(/^[a-z0-9]+$/), text: z.string() },
  async ({ name, text }) => {
    await writeTmpFile(name, text);

    return {
        content: [{ type: "text", text: "保存しました" }]
    };
  }
);

server.resource(
  "mcpexp",
  new ResourceTemplate("mcpexp://{name}", { list: undefined }),
  async (uri, {name}) => {
    const list = getTmpFiles();

    return { contents: [{
      uri: uri.href,
      text: list.join("\n")
    }]};
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
