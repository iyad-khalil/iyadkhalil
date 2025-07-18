import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validation = insertContactMessageSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({
          message: "Invalid form data",
          errors: validation.error.format()
        });
      }
      
      // Store the contact message
      const contactMessage = await storage.createContactMessage(validation.data);
      
      return res.status(201).json({
        message: "Message sent successfully",
        data: contactMessage
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      return res.status(500).json({
        message: "Failed to send message. Please try again later."
      });
    }
  });

  // Serve resume files
  app.get("/api/resume/:locale", (req, res) => {
    const { locale } = req.params;
    
    if (locale === "en") {
      return res.redirect("/attached_assets/Iyad_Khalil_Resume_US.pdf");
    } else if (locale === "fr") {
      return res.redirect("/attached_assets/Iyad_Khalil_CV_FR.pdf");
    } else {
      return res.status(404).json({
        message: "Resume not found"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
