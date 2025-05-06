import type { VideoInfo, UserInfo, Comment } from "../types/bilibili.js"

/**
 * 格式化时间戳为可读日期字符串
 */
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

/**
 * 格式化视频时长（秒）
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`
  }

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`
}

/**
 * 格式化视频信息
 */
export function formatVideoInfo(video: VideoInfo): string {
  let info = `标题: ${video.title}\n`
  info += `BV号: ${video.bvid}\n`
  info += `UP主: ${video.owner.name} (UID: ${video.owner.mid})\n`
  info += `发布时间: ${formatTimestamp(video.pubdate)}\n`
  info += `时长: ${formatDuration(video.duration)}\n`
  info += `播放量: ${video.stat.view}\n`
  info += `点赞数: ${video.stat.like}\n`
  info += `投币数: ${video.stat.coin}\n`
  info += `收藏数: ${video.stat.favorite}\n`
  info += `弹幕数: ${video.stat.danmaku}\n`
  info += `评论数: ${video.stat.reply}\n`

  if (video.desc) {
    info += `\n简介: ${video.desc}\n`
  }

  if (video.dynamic) {
    info += `\n动态: ${video.dynamic}\n`
  }

  if (video.pages && video.pages.length > 1) {
    info += `\n分P信息: \n`
    video.pages.slice(0, 5).forEach((page, index) => {
      info += `  P${page.page}: ${page.part} (${formatDuration(page.duration)})\n`
    })

    if (video.pages.length > 5) {
      info += `  ...(共 ${video.pages.length} 个分P)\n`
    }
  }

  return info
}

/**
 * 格式化用户信息
 */
export function formatUserInfo(user: UserInfo): string {
  let info = `用户名: ${user.name}\n`
  info += `UID: ${user.mid}\n`
  info += `等级: Lv${user.level}\n`
  info += `粉丝数: ${user.follower}\n`
  info += `关注数: ${user.following}\n`

  if (user.face) {
    info += `头像: ${user.face}\n`
  }

  if (user.birthday) {
    info += `生日: ${user.birthday}\n`
  }

  if (user.tags?.length > 0) {
    info += `标签: ${user.tags.join(", ")}\n`
  }

  if (user.official && user.official.title) {
    info += `认证: ${user.official.title}\n`
    if (user.official.desc) {
      info += `认证简介: ${user.official.desc}\n`
    }
  }

  if (user.sign) {
    info += `个人简介: ${user.sign}\n`
  }

  if (user.vip && user.vip.type > 0 && user.vip.status === 1) {
    info += `会员状态: ${user.vip.type === 2 ? "年度大会员" : "月度大会员"}\n`
  }

  if (user.live_room?.url) {
    info += `直播间地址: ${user.live_room.url}\n`
    info += `直播间 ${user.live_room.watched_show?.text_small ?? 0} 人看过\n`
  }

  return info
}

/**
 * 格式化评论
 */
export function formatComments(comments: Comment[]): string {
  if (comments.length === 0) {
    return "没有找到评论"
  }

  return comments
    .map((comment, index) => {
      let formattedComment = `${index + 1}. ${comment.uname}: ${comment.content.message}\n`
      formattedComment += `   点赞数: ${comment.like}`
      if (comment.rcount > 0) {
        formattedComment += `   回复数: ${comment.rcount}`
      }
      formattedComment += `   时间: ${formatTimestamp(comment.ctime)}`
      return formattedComment
    })
    .join("\n\n")
}
