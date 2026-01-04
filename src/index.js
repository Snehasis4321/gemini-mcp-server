import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

if (!API_KEY) {
  console.error("Error: GEMINI_API_KEY environment variable is not set");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const server = new McpServer({
  name: "gemini-mcp-server",
  version: "1.0.0",
});

// Register tools
server.tool(
  "chat",
  "Send a message to Gemini and get a response. Supports multi-turn conversations.",
  {
    message: z.string().describe("The message to send to Gemini"),
    conversationHistory: z
      .array(
        z.object({
          role: z.enum(["user", "model"]),
          content: z.string(),
        })
      )
      .optional()
      .describe("Previous messages in the conversation"),
  },
  async ({ message, conversationHistory = [] }) => {
    try {
      const contents = [
        ...conversationHistory.map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.content }],
        })),
        {
          role: "user",
          parts: [{ text: message }],
        },
      ];

      const response = await ai.models.generateContent({
        model: MODEL,
        contents: contents,
      });

      const text = response.text;

      return {
        content: [
          {
            type: "text",
            text: text,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Chat failed: ${error.message}`);
    }
  }
);

server.tool(
  "search",
  "Search for current information using Gemini with real-time web search capabilities",
  {
    query: z.string().describe("The search query"),
  },
  async ({ query }) => {
    try {
      // Use Gemini with Google Search grounding for real-time information
      const response = await ai.models.generateContent({
        model: MODEL,
        contents: `Search the web for current information about: ${query}`,
        config: {
          tools: [{ type: 'google_search' }],
        },
      });

      const text = response.text;

      return {
        content: [
          {
            type: "text",
            text: text,
          },
        ],
      };
    } catch (error) {
      // Fallback to knowledge-based search if web search fails
      try {
        const fallbackResponse = await ai.models.generateContent({
          model: MODEL,
          contents: `Based on your knowledge, provide information about: ${query}\n\nNote: This is based on training data, not real-time web search.`,
        });

        return {
          content: [
            {
              type: "text",
              text: `⚠️ Web search unavailable, using knowledge base:\n\n${fallbackResponse.text}`,
            },
          ],
        };
      } catch (fallbackError) {
        throw new Error(`Search failed: ${error.message}`);
      }
    }
  }
);

server.tool(
  "knowledge",
  "Query Gemini's knowledge base (training data) without web search",
  {
    query: z.string().describe("The knowledge query"),
  },
  async ({ query }) => {
    try {
      const response = await ai.models.generateContent({
        model: MODEL,
        contents: `Based on your training data and knowledge, provide information about: ${query}\n\nProvide a comprehensive answer with relevant details.`,
      });

      const text = response.text;

      return {
        content: [
          {
            type: "text",
            text: text,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Knowledge query failed: ${error.message}`);
    }
  }
);

server.tool(
  "analyze",
  "Analyze text, code, or data with Gemini",
  {
    content: z.string().describe("The content to analyze"),
    analysisType: z
      .enum(["code", "text", "data", "general"])
      .describe("Type of analysis to perform"),
  },
  async ({ content, analysisType }) => {
    try {
      const prompt = `Analyze the following ${analysisType}:\n\n${content}\n\nProvide a detailed analysis.`;
      const response = await ai.models.generateContent({
        model: MODEL,
        contents: prompt,
      });

      const text = response.text;

      return {
        content: [
          {
            type: "text",
            text: text,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Analysis failed: ${error.message}`);
    }
  }
);

server.tool(
  "generate",
  "Generate content like code, documentation, or creative text",
  {
    prompt: z.string().describe("The generation prompt"),
    contentType: z
      .enum(["code", "documentation", "creative", "technical"])
      .describe("Type of content to generate"),
  },
  async ({ prompt, contentType }) => {
    try {
      const fullPrompt = `Generate ${contentType} content based on this request:\n\n${prompt}`;
      const response = await ai.models.generateContent({
        model: MODEL,
        contents: fullPrompt,
      });

      const text = response.text;

      return {
        content: [
          {
            type: "text",
            text: text,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Generation failed: ${error.message}`);
    }
  }
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Gemini MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
