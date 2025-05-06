import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import { getUserInfo, getUserVideos } from "../common/utils.js"
import { formatUserInfo, formatTimestamp } from "../common/formatter.js"

/**
 * Register user-related tools
 */
export function registerUserTools(server: McpServer): void {
  server.tool(
    "get_user_info",
    "Get information about a Bilibili user",
    {
      mid: z.number().int().positive().describe("User's numeric ID"),
    },
    async ({ mid }) => {
      try {
        const userInfo = await getUserInfo(mid)
        const formattedInfo = formatUserInfo(userInfo)

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
              text: `获取用户信息失败: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        }
      }
    }
  )

  server.tool(
    "get_user_videos",
    "获取 bilibili 用户上传的视频",
    {
      mid: z.number().int().positive().describe("用户的数字 ID"),
      page: z.number().int().min(1).default(1).describe("页码，默认为第1页"),
      count: z
        .number()
        .int()
        .min(1)
        .max(30)
        .default(10)
        .describe("要获取的视频数量，默认10条，最多30条"),
    },
    async ({ mid, page, count }) => {
      try {
        const userInfo = await getUserInfo(mid)
        const videos = await getUserVideos(mid, page)
        const limitedVideos = videos.slice(0, count)

        if (limitedVideos.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: `用户 ${userInfo.name}(UID:${mid}) 没有上传视频或已将视频设为私密。`,
              },
            ],
          }
        }

        const videosList = limitedVideos
          .map((video, index) => {
            return `${index + 1}. 《${video.title}》\n   BV号: ${video.bvid}\n   播放量: ${video.stat?.view || 0}   发布时间: ${formatTimestamp(video.pubdate)}`
          })
          .join("\n\n")

        return {
          content: [
            {
              type: "text",
              text: `用户 ${userInfo.name}(UID:${mid}) 的视频列表：\n\n${videosList}`,
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `获取用户视频列表失败: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        }
      }
    }
  )
}
