import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Campaigns table for managing different fundraising campaigns
export const campaigns = pgTable("campaigns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  goalAmount: decimal("goal_amount", { precision: 12, scale: 2 }).notNull(),
  currentAmount: decimal("current_amount", { precision: 12, scale: 2 }).notNull().default("0"),
  donorCount: integer("donor_count").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  deadline: timestamp("deadline"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Donations table for tracking individual donations
export const donations = pgTable("donations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  campaignId: varchar("campaign_id").notNull().references(() => campaigns.id),
  donorName: text("donor_name"),
  donorEmail: text("donor_email"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  numberOfTickets: integer("number_of_tickets").notNull(),
  paymentStatus: text("payment_status").notNull().default("pending"), // pending, completed, failed
  paymentId: text("payment_id"), // External payment processor ID
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Raffle numbers table for tracking assigned numbers
export const raffleNumbers = pgTable("raffle_numbers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  campaignId: varchar("campaign_id").notNull().references(() => campaigns.id),
  donationId: varchar("donation_id").notNull().references(() => donations.id),
  numberValue: integer("number_value").notNull(),
  isWinner: boolean("is_winner").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Define relations
export const campaignsRelations = relations(campaigns, ({ many }) => ({
  donations: many(donations),
  raffleNumbers: many(raffleNumbers),
}));

export const donationsRelations = relations(donations, ({ one, many }) => ({
  campaign: one(campaigns, {
    fields: [donations.campaignId],
    references: [campaigns.id],
  }),
  raffleNumbers: many(raffleNumbers),
}));

export const raffleNumbersRelations = relations(raffleNumbers, ({ one }) => ({
  campaign: one(campaigns, {
    fields: [raffleNumbers.campaignId],
    references: [campaigns.id],
  }),
  donation: one(donations, {
    fields: [raffleNumbers.donationId],
    references: [donations.id],
  }),
}));

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCampaignSchema = createInsertSchema(campaigns).omit({
  id: true,
  currentAmount: true,
  donorCount: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDonationSchema = createInsertSchema(donations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertRaffleNumberSchema = createInsertSchema(raffleNumbers).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Campaign = typeof campaigns.$inferSelect;
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type Donation = typeof donations.$inferSelect;
export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type RaffleNumber = typeof raffleNumbers.$inferSelect;
export type InsertRaffleNumber = z.infer<typeof insertRaffleNumberSchema>;
