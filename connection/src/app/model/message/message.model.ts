export interface Message {
  sender: { S: string };
  message: { S: string };
  authorID: { S: string };
  recipient: { S: string };
  createdAt: { S: string };
}
