export interface BiliResponse<T> {
  code: number
  message: string
  ttl?: number
  data: T
}

export interface VideoInfo {
  bvid: string
  aid: number
  title: string
  desc?: string
  pic?: string
  owner: {
    mid: number
    name: string
    face?: string
  }
  stat: {
    view: number
    danmaku: number
    reply: number
    favorite: number
    coin: number
    share: number
    like: number
  }
  duration: number
  cid: number
  pubdate: number
  ctime: number
  videos?: number
  pages?: VideoPage[]
  dynamic?: string
  copyright?: number
  dimension?: {
    width: number
    height: number
    rotate: number
  }
}

export interface VideoPage {
  cid: number
  page: number
  part: string
  duration: number
  dimension: {
    width: number
    height: number
  }
}

export interface SearchResult {
  seid: string
  page: number
  pagesize: number
  numResults: number
  numPages: number
  result: Array<VideoSearchItem | UserSearchItem>
}

export interface VideoSearchItem {
  type: "video"
  id: number
  bvid: string
  title: string
  description: string
  author: string
  mid: number
  pic: string
  play: number
  danmaku: number
  duration: string
  pubdate: number
}

export interface UserSearchItem {
  type: "user"
  mid: number
  name: string
  face: string
  fans: number
  level: number
  official: {
    role: number
    title: string
  } | null
  sign: string
  videos?: number
}

/**
 * 用户信息
 */
export interface UserInfo {
  mid: number
  /** 用户名 */
  name: string
  /** 头像图片地址 */
  face: string
  /** 个性签名 */
  sign: string
  /** 等级 */
  level: number
  /** 生日 */
  birthday: string
  /** 标签 */
  tags: string[]
  /** 粉丝数 */
  follower: number
  /** 关注数 */
  following: number
  live_room: {
    /** 直播间地址 */
    url: string
    watched_show: {
      /** 多少人看过 */
      text_small: number
    }
  }
  official: {
    role: number
    title: string
    desc: string
  } | null
  vip: {
    type: number
    status: number
  }
}

export interface Comment {
  rpid: number
  oid: number
  mid: number
  uname: string
  content: {
    message: string
    max_line: number
  }
  ctime: number
  like: number
  rcount: number
  replies?: Comment[]
}
