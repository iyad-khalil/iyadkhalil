import { contactMessages, type ContactMessage, type InsertContactMessage } from "../shared/schema";

export interface IStorage {
  createContactMessage(msg: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private messages: Map<number, ContactMessage>;
  private currentId: number;

  constructor() {
    this.messages = new Map();
    this.currentId = 1;
  }

  async createContactMessage(msg: InsertContactMessage): Promise<ContactMessage> {
    const contactMessage: ContactMessage = {
      ...msg,
      id: this.currentId++,
      createdAt: new Date(),
    };
    this.messages.set(contactMessage.id, contactMessage);
    return contactMessage;
  }
}

export const storage = new MemStorage();
