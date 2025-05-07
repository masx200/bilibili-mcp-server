import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import { getVideoDetail, getRelatedVideos, formatTimestamp, formatDuration } from "../common/utils.js"

export function registerVideoTools(server: McpServer): void {
  // 获取视频详情工具
  server.tool(
    "get_video_info",
    "Get detailed information about a Bilibili video",
    {
      bvid: z.string().describe("Bilibili video ID (BVID)"),
    },
    async ({ bvid }) => {
      try {
        const videoDetail = await getVideoDetail(bvid)
        
        const stats = videoDetail.stat
        
        const formattedDetail = `
Title: ${videoDetail.title}
URL: https://www.bilibili.com/video/${videoDetail.bvid}
AID: ${videoDetail.aid}
Uploader: ${videoDetail.owner.name} (UID: ${videoDetail.owner.mid})
Published: ${formatTimestamp(videoDetail.pubdate)}
Duration: ${formatDuration(videoDetail.duration)}

Stats:
- Views: ${stats.view.toLocaleString()}
- Likes: ${stats.like.toLocaleString()}
- Danmaku: ${stats.danmaku.toLocaleString()}
- Comments: ${stats.reply.toLocaleString()}
- Favorites: ${stats.favorite.toLocaleString()}
- Coins: ${stats.coin.toLocaleString()}
- Shares: ${stats.share.toLocaleString()}

Description:
${videoDetail.desc}

Tags: ${videoDetail.tags.join(", ")}
`

        return {
          content: [
            {
              type: "text",
              text: formattedDetail.trim(),
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Failed to fetch video info: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        }
      }
    }
  )

  // 获取相关视频推荐工具
  server.tool(
    "get_related_videos",
    "Get related video recommendations for a Bilibili video",
    {
      bvid: z.string().describe("Bilibili video ID (BVID)"),
      count: z
        .number()
        .int()
        .min(1)
        .max(20)
        .default(5)
        .describe("Number of related videos to return, default 5, maximum 20"),
    },
    async ({ bvid, count }) => {
      try {
        const relatedVideos = await getRelatedVideos(bvid)
        
        if (!relatedVideos || relatedVideos.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: `No related videos found for ${bvid}`,
              },
            ],
          }
        }

        const limitedResults = relatedVideos.slice(0, count)
        
        const formattedResults = limitedResults
          .map((video, index) => {
            return `${index + 1}. "${video.title}" - ${video.owner.name}\n   BVID: ${video.bvid}\n   Views: ${video.stat.view.toLocaleString()}   Danmaku: ${video.stat.danmaku.toLocaleString()}   Duration: ${formatDuration(video.duration)}`
          })
          .join("\n\n")

        return {
          content: [
            {
              type: "text",
              text: `Related videos for ${bvid}:\n\n${formattedResults}`,
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Failed to fetch related videos: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        }
      }
    }
  )
}
