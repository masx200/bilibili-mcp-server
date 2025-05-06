import type { UserInfo } from "./types.js"
// @ts-ignore
import biliAPI from "bili-api"
import i18n from "./i18n.js"

export async function getUserInfo(mid: number): Promise<UserInfo> {
  try {
    const res = (await biliAPI({ mid }, ["uname", "follower"])) || {}
    const data = res.info?.data || {}
    data.followInfo = res.stat?.data
    data.mid = mid
    return data
  } catch (error) {
    console.error("Error fetching user info:", error)
    throw error
  }
}

export function formatUserInfo(user: UserInfo): string {
  const t = i18n.user
  const baseInfo = {
    [t.profile]: `https://space.bilibili.com/${user.mid}`,
    [t.uid]: user.mid,
  }
  const optionalInfo: Record<string, string | undefined> = {
    [t.nickname]: user.name,
    [t.followers]: user.followInfo?.follower?.toLocaleString(),
    [t.following]: user.followInfo?.following?.toLocaleString(),
    [t.level]: user.level?.toString(),
    [t.avatar]: user.face,
    [t.bio]: user.sign,
    [t.birthday]: user.birthday,
    [t.tags]: user.tags?.length > 0 ? user.tags.join(", ") : undefined,
    [t.verification]: user.official?.title,
    [t.verificationDesc]: user.official?.title
      ? user.official?.desc
      : undefined,
    [t.liveRoomUrl]: user.live_room?.url,
    [t.liveStatus]: user.live_room?.url
      ? user.live_room.liveStatus
        ? t.liveOn
        : t.liveOff
      : undefined,
  }

  let info =
    Object.entries(baseInfo)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n") + "\n"
  info += Object.entries(optionalInfo)
    .filter(([_, value]) => value !== undefined && value !== '')
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n")

  return info
}
