/* eslint-disable camelcase */
export interface note {
  id: string;
  description: string;
  detail: string;
  user_id?: string;
  create_at: Date;
  updated_at: Date;
}

export interface datum {
  id?: string;
  description: string;
  detail: string;
  token?: string;
}
