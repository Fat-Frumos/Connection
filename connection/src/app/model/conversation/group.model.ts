export interface Group {
  id: { S: string };
  name: { S: string };
  createdAt: { S: string };
  createdBy: { S: string };
  isOwned: boolean;
}

