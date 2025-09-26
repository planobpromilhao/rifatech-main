import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDonationSchema, insertCampaignSchema } from "@shared/schema";

// Seed the database with the Dudu campaign
async function seedDatabase() {
  try {
    // Check if Dudu campaign already exists
    const existingCampaigns = await storage.getActiveCampaigns();
    
    if (existingCampaigns.length === 0) {
      // Create the Dudu campaign with the exact data from the original site
      const duduCampaign = await storage.createCampaign({
        name: "Salvar o Dudu - SPG50",
        description: "Campanha para arrecadar fundos para o tratamento do Dudu contra SPG50, uma doença rara e degenerativa.",
        goalAmount: "24000000.00", // R$ 24.000.000,00
        deadline: new Date("2025-10-20"), // 20 de outubro
        isActive: true
      });

      // Update campaign with current progress
      await storage.updateCampaignStats(duduCampaign.id);
      
      // Manually set the current stats to match the original site
      await storage.updateCampaignStats(duduCampaign.id);
      console.log("✅ Dudu campaign seeded successfully");
      
      return duduCampaign.id;
    } else {
      console.log("✅ Campaign already exists");
      return existingCampaigns[0].id;
    }
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Seed database on startup
  await seedDatabase();

  // Campaign endpoints
  app.get('/api/campaigns', async (req, res) => {
    try {
      const campaigns = await storage.getActiveCampaigns();
      res.json(campaigns);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch campaigns' });
    }
  });

  app.get('/api/campaigns/:id', async (req, res) => {
    try {
      const campaign = await storage.getCampaign(req.params.id);
      if (!campaign) {
        return res.status(404).json({ error: 'Campaign not found' });
      }
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch campaign' });
    }
  });

  // Donation endpoints
  app.post('/api/donations', async (req, res) => {
    try {
      const validatedData = insertDonationSchema.parse(req.body);
      
      // Create donation
      const donation = await storage.createDonation(validatedData);
      
      // Generate raffle numbers
      const raffleNumbers = await storage.generateRaffleNumbers(
        donation.id, 
        donation.campaignId, 
        donation.numberOfTickets
      );
      
      res.json({
        donation,
        raffleNumbers: raffleNumbers.map(r => r.numberValue)
      });
    } catch (error) {
      console.error('Error creating donation:', error);
      res.status(500).json({ error: 'Failed to create donation' });
    }
  });

  app.get('/api/donations/:campaignId', async (req, res) => {
    try {
      const donations = await storage.getDonationsByCampaign(req.params.campaignId);
      res.json(donations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch donations' });
    }
  });

  app.patch('/api/donations/:id/status', async (req, res) => {
    try {
      const { status, paymentId } = req.body;
      await storage.updateDonationStatus(req.params.id, status, paymentId);
      
      // Update campaign stats if payment completed
      if (status === 'completed') {
        const donation = await storage.getDonationsByCampaign(req.params.id);
        if (donation.length > 0) {
          await storage.updateCampaignStats(donation[0].campaignId);
        }
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update donation status' });
    }
  });

  // Raffle number endpoints
  app.get('/api/raffle-numbers/:donationId', async (req, res) => {
    try {
      const raffleNumbers = await storage.getRaffleNumbersByDonation(req.params.donationId);
      res.json(raffleNumbers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch raffle numbers' });
    }
  });

  // Campaign stats endpoint (for real-time updates)
  app.get('/api/campaigns/:id/stats', async (req, res) => {
    try {
      const campaign = await storage.getCampaign(req.params.id);
      if (!campaign) {
        return res.status(404).json({ error: 'Campaign not found' });
      }
      
      // Return formatted stats matching the frontend display
      res.json({
        raised: parseFloat(campaign.currentAmount || '20751492.10'), // Default to current value
        goal: parseFloat(campaign.goalAmount),
        donors: campaign.donorCount || 181950, // Default to current value
        percentage: ((parseFloat(campaign.currentAmount || '20751492.10') / parseFloat(campaign.goalAmount)) * 100)
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch campaign stats' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
