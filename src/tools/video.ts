import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import { getVideoInfo, getVideoComments } from "../common/utils.js"
import { formatVideoInfo, formatComments } from "../common/formatter.js"

/**
 * Register video-related tools
 */
export function registerVideoTools(server: McpServer): void {
  /**
   * Get detailed information about a Bilibili video
   */
  server.tool(
    "get_video_info",
    "Get detailed information about a Bilibili video",
    {
      bvid: z.string().describe("Video BV ID, e.g.: BV1xx411c7mD"),
    },
    async ({ bvid }) => {
      try {
        const videoInfo = await getVideoInfo(bvid)
        const formattedInfo = formatVideoInfo(videoInfo)

        return {
          content: [
            {
              type: "text",
              text: formattedInfo,
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Failed to get video info: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        }
      }
    }
  )

  /**
   * Get popular comments for a Bilibili video
   */
  server.tool(
    "get_video_comments",
    "Get popular comments for a Bilibili video",
    {
      bvid: z.string().describe("Video BV ID, e.g.: BV1xx411c7mD"),
      count: z
        .number()
        .int()
        .min(1)
        .max(20)
        .default(10)
        .describe("Number of comments to retrieve, default 10, maximum 20"),
    },
    async ({ bvid, count }) => {
      try {
        const videoInfo = await getVideoInfo(bvid)
        const comments = await getVideoComments(videoInfo.aid, 1)
        const limitedComments = comments.slice(0, count)
        const formattedComments = formatComments(limitedComments)

        return {
          content: [
            {
              type: "text",
              text: `Popular comments for video "${videoInfo.title}":\n\n${formattedComments}`,
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Failed to get video comments: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        }
      }
    }
  )
}
