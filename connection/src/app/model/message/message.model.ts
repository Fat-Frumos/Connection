export interface Message {
  recipient: string;
  authorID: string;
  message: string;
  createdAt: string;
  sender: string;
  lastMessage?: string;
}
