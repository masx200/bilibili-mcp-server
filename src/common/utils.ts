import type {
  BiliResponse,
  VideoInfo,
  SearchResult,
  UserInfo,
  Comment,
} from "../types/bilibili.js"
import nodeFetch from "node-fetch"
// @ts-ignore
import biliAPI from "bili-api"

// If fetch doesn't exist in global scope, add it
if (!globalThis.fetch) {
  globalThis.fetch = nodeFetch as unknown as typeof global.fetch
}

const BASE_URL = "https://api.bilibili.com"

// Default request headers
const DEFAULT_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
  Referer: "https://www.bilibili.com",
}

/**
 * Generic function to make API requests
 */
async function apiRequest<T>(
  endpoint: string,
  params?: Record<string, string | number>
): Promise<T> {
  let url = `${BASE_URL}${endpoint}`

  if (params) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value))
    })
    url += `?${searchParams.toString()}`
  }

  const response = await fetch(url, {
    headers: DEFAULT_HEADERS,
  })

  if (!response.ok) {
    throw new Error(`API 请求失败: ${response.status} ${response.statusText}`)
  }

  const data = (await response.json()) as BiliResponse<T>

  if (data.code !== 0) {
    throw new Error(`API 返回错误: ${data.message || "未知错误"}`)
  }

  return data.data
}

/**
 * 通过 BV 号获取视频信息
 */
export async function getVideoInfo(bvid: string): Promise<VideoInfo> {
  try {
    return await apiRequest<VideoInfo>("/x/web-interface/view", { bvid })
  } catch (error) {
    console.error("Error fetching video info:", error)
    throw error
  }
}

/**
 * Search for videos
 */
export async function searchVideos(
  keyword: string,
  page: number = 1
): Promise<SearchResult> {
  try {
    return await apiRequest<SearchResult>("/x/web-interface/search/all/v2", {
      keyword,
      page,
      search_type: "video",
    })
  } catch (error) {
    console.error("Error searching videos:", error)
    throw error
  }
}

/**
 * Get user information
 */
export async function getUserInfo(mid: number): Promise<UserInfo> {
  try {
    const res = (await biliAPI({ mid }, ["uname", "follower"])) || {}
    return res.info?.data || {}
  } catch (error) {
    console.error("Error fetching user info:", error)
    throw error
  }
}

/**
 * Get video comments
 */
export async function getVideoComments(
  aid: number,
  page: number = 1
): Promise<Comment[]> {
  try {
    const data = await apiRequest<{ replies: Comment[] }>("/x/v2/reply", {
      type: 1,
      oid: aid,
      pn: page,
      sort: 2, // Sort by popularity
    })

    return data.replies || []
  } catch (error) {
    console.error("Error fetching video comments:", error)
    throw error
  }
}

/**
 * Get user's video list
 */
export async function getUserVideos(
  mid: number,
  page: number = 1
): Promise<VideoInfo[]> {
  try {
    const data = await apiRequest<{ list: { vlist: VideoInfo[] } }>(
      "/x/space/arc/search",
      {
        mid,
        pn: page,
        ps: 30,
        order: "pubdate",
      }
    )

    return data.list.vlist
  } catch (error) {
    console.error("Error fetching user videos:", error)
    throw error
  }
}

/**
 * Get related video recommendations
 */
export async function getRelatedVideos(bvid: string): Promise<VideoInfo[]> {
  try {
    return await apiRequest<VideoInfo[]>("/x/web-interface/archive/related", {
      bvid,
    })
  } catch (error) {
    console.error("Error fetching related videos:", error)
    throw error
  }
}
