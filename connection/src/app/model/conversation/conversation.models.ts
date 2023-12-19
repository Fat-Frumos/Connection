export interface Conversation {
  id: { S: string; };
  companionID: { S: string; };
}

export interface CompanionId {
  companionID: string;
}

export interface ConversationId {
  conversationID: string;
  since: number;
}
