// file to create the refresh token entity

// interface for the refresh token
export interface RefreshToken {
  id?: string;
  user_id: string;
  token: string;
  expires_at: Date;
  created_at: Date;
}
