import { 
  type User, 
  type InsertUser,
  type Campaign,
  type InsertCampaign,
  type Donation,
  type InsertDonation,
  type RaffleNumber,
  type InsertRaffleNumber,
  users,
  campaigns,
  donations,
  raffleNumbers
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sum, count } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Campaign methods
  getCampaign(id: string): Promise<Campaign | undefined>;
  getActiveCampaigns(): Promise<Campaign[]>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  updateCampaignStats(campaignId: string): Promise<void>;
  
  // Donation methods
  createDonation(donation: InsertDonation): Promise<Donation>;
  getDonation(donationId: string): Promise<Donation | undefined>;
  getDonationsByCampaign(campaignId: string): Promise<Donation[]>;
  updateDonationStatus(donationId: string, status: string, paymentId?: string): Promise<void>;
  updateDonationPix(donationId: string, pixData: { pixQrCode: string; pixCopyPaste: string; pixExpiresAt: Date; paymentId: string }): Promise<void>;
  
  // Raffle number methods
  generateRaffleNumbers(donationId: string, campaignId: string, count: number): Promise<RaffleNumber[]>;
  getRaffleNumbersByDonation(donationId: string): Promise<RaffleNumber[]>;
  getAvailableRaffleNumbers(campaignId: string, count: number): Promise<number[]>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Campaign methods
  async getCampaign(id: string): Promise<Campaign | undefined> {
    const [campaign] = await db.select().from(campaigns).where(eq(campaigns.id, id));
    return campaign || undefined;
  }

  async getActiveCampaigns(): Promise<Campaign[]> {
    return await db.select().from(campaigns).where(eq(campaigns.isActive, true));
  }

  async createCampaign(campaign: InsertCampaign): Promise<Campaign> {
    const [newCampaign] = await db
      .insert(campaigns)
      .values(campaign)
      .returning();
    return newCampaign;
  }

  async updateCampaignStats(campaignId: string): Promise<void> {
    // Calculate current amount and donor count from completed donations
    const statsResult = await db
      .select({
        totalAmount: sum(donations.amount),
        donorCount: count(donations.id)
      })
      .from(donations)
      .where(eq(donations.campaignId, campaignId) && eq(donations.paymentStatus, 'completed'));

    const stats = statsResult[0];
    const totalAmount = stats.totalAmount || '0';
    const donorCount = stats.donorCount || 0;

    await db
      .update(campaigns)
      .set({
        currentAmount: totalAmount,
        donorCount: donorCount,
        updatedAt: new Date()
      })
      .where(eq(campaigns.id, campaignId));
  }

  // Donation methods
  async createDonation(donation: InsertDonation): Promise<Donation> {
    const [newDonation] = await db
      .insert(donations)
      .values(donation)
      .returning();
    return newDonation;
  }

  async getDonation(donationId: string): Promise<Donation | undefined> {
    const [donation] = await db.select().from(donations).where(eq(donations.id, donationId));
    return donation || undefined;
  }

  async getDonationsByCampaign(campaignId: string): Promise<Donation[]> {
    return await db
      .select()
      .from(donations)
      .where(eq(donations.campaignId, campaignId))
      .orderBy(desc(donations.createdAt));
  }

  async updateDonationStatus(donationId: string, status: string, paymentId?: string): Promise<void> {
    await db
      .update(donations)
      .set({
        paymentStatus: status,
        paymentId: paymentId,
        updatedAt: new Date()
      })
      .where(eq(donations.id, donationId));
  }

  async updateDonationPix(donationId: string, pixData: { pixQrCode: string; pixCopyPaste: string; pixExpiresAt: Date; paymentId: string }): Promise<void> {
    await db
      .update(donations)
      .set({
        pixQrCode: pixData.pixQrCode,
        pixCopyPaste: pixData.pixCopyPaste,
        pixExpiresAt: pixData.pixExpiresAt,
        paymentId: pixData.paymentId,
        updatedAt: new Date()
      })
      .where(eq(donations.id, donationId));
  }

  // Raffle number methods
  async generateRaffleNumbers(donationId: string, campaignId: string, count: number): Promise<RaffleNumber[]> {
    const availableNumbers = await this.getAvailableRaffleNumbers(campaignId, count);
    
    const raffleNumbersToInsert = availableNumbers.slice(0, count).map(numberValue => ({
      donationId,
      campaignId,
      numberValue
    }));

    return await db
      .insert(raffleNumbers)
      .values(raffleNumbersToInsert)
      .returning();
  }

  async getRaffleNumbersByDonation(donationId: string): Promise<RaffleNumber[]> {
    return await db
      .select()
      .from(raffleNumbers)
      .where(eq(raffleNumbers.donationId, donationId));
  }

  async getAvailableRaffleNumbers(campaignId: string, count: number): Promise<number[]> {
    // Get all existing raffle numbers for this campaign
    const existingNumbers = await db
      .select({ numberValue: raffleNumbers.numberValue })
      .from(raffleNumbers)
      .where(eq(raffleNumbers.campaignId, campaignId));

    const usedNumbers = new Set(existingNumbers.map(r => r.numberValue));
    const available: number[] = [];
    
    // Generate sequential numbers starting from 1
    let current = 1;
    while (available.length < count) {
      if (!usedNumbers.has(current)) {
        available.push(current);
      }
      current++;
    }
    
    return available;
  }
}

export const storage = new DatabaseStorage();
