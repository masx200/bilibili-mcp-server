// import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
// import { z } from "zod"
// import { formatTimestamp, searchVideos } from "../common/utils.js"

// export function registerSearchTools(server: McpServer): void {
//   server.tool(
//     "search_videos",
//     "Search for videos on Bilibili",
//     {
//       keyword: z.string().describe("Keyword to search for"),
//       page: z
//         .number()
//         .int()
//         .min(1)
//         .default(1)
//         .describe("Page number, defaults to 1"),
//       count: z
//         .number()
//         .int()
//         .min(1)
//         .max(20)
//         .default(10)
//         .describe("Number of results to return, default 10, maximum 20"),
//     },
//     async ({ keyword, page, count }) => {
//       try {
//         const searchResult = await searchVideos(keyword, page)

//         if (!searchResult.result || searchResult.result.length === 0) {
//           return {
//             content: [
//               {
//                 type: "text",
//                 text: `No videos found related to "${keyword}".`,
//               },
//             ],
//           }
//         }

//         const videoResults = searchResult.result
//           .filter((item) => "bvid" in item)
//           .slice(0, count)

//         const formattedResults = videoResults
//           .map((video, index) => {
//             if ("bvid" in video) {
//               return `${index + 1}. "${video.title}" - ${video.author}\n   BV ID: ${video.bvid}\n   Views: ${video.play}   Danmaku: ${video.danmaku}   Duration: ${video.duration}\n   Published: ${formatTimestamp(video.pubdate)}\n   Description: ${video.description.substring(0, 100)}${video.description.length > 100 ? "..." : ""}`
//             }
//             return ""
//           })
//           .filter(Boolean)
//           .join("\n\n")

//         return {
//           content: [
//             {
//               type: "text",
//               text: `Search results for "${keyword}":\n\n${formattedResults}\n\nFound ${searchResult.numResults} related videos in total, currently showing ${videoResults.length} results from page ${page}.`,
//             },
//           ],
//         }
//       } catch (error) {
//         return {
//           content: [
//             {
//               type: "text",
//               text: `Failed to search videos: ${error instanceof Error ? error.message : String(error)}`,
//             },
//           ],
//         }
//       }
//     }
//   )
// }
