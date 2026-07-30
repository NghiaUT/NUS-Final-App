export interface ApiResponse<T> {
  status: string;
  message: string;
  statusCode: number;
  errCode?: string;
  data: T;
  timeStamp: Date;
}

export type FetchDataType = 'photo' | 'album' | 'follower' | 'following';
export type OAuthProvider = 'google';
