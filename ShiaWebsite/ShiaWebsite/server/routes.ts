import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertPrayerRecordSchema } from "@shared/schema";
import { adminOnly } from "./middleware";

// Admin routes
app.get("/api/admin/stats", adminOnly, async (_req, res) => {
  const stats = {
    totalPrayers: (await storage.getPrayerRecords()).length,
    totalBooks: (await storage.getBooks()).length,
    totalDuas: (await storage.getDuas()).length,
  };
  res.json(stats);
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Quran routes
  app.get("/api/quran/:surah/:verse", async (req, res) => {
    const surah = parseInt(req.params.surah);
    const verse = parseInt(req.params.verse);
    const result = await storage.getVerse(surah, verse);
    if (!result) {
      res.status(404).json({ message: "Verse not found" });
      return;
    }
    res.json(result);
  });

  app.get("/api/quran/:surah/:startVerse/:endVerse", async (req, res) => {
    const surah = parseInt(req.params.surah);
    const startVerse = parseInt(req.params.startVerse);
    const endVerse = parseInt(req.params.endVerse);
    const verses = await storage.getVersesByRange(surah, startVerse, endVerse);
    res.json(verses);
  });

  // Books routes
  app.get("/api/books", async (_req, res) => {
    const books = await storage.getBooks();
    res.json(books);
  });

  app.get("/api/books/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const book = await storage.getBook(id);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.json(book);
  });

  // Dua routes
  app.get("/api/duas", async (_req, res) => {
    const duas = await storage.getDuas();
    res.json(duas);
  });

  app.get("/api/duas/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const dua = await storage.getDua(id);
    if (!dua) {
      res.status(404).json({ message: "Dua not found" });
      return;
    }
    res.json(dua);
  });

  app.get("/api/duas/category/:category", async (req, res) => {
    const duas = await storage.getDuasByCategory(req.params.category);
    res.json(duas);
  });

  // Ziyarat routes
  app.get("/api/ziyarat", async (_req, res) => {
    const ziyarats = await storage.getZiyarat();
    res.json(ziyarats);
  });

  app.get("/api/ziyarat/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const ziyarat = await storage.getZiyaratById(id);
    if (!ziyarat) {
      res.status(404).json({ message: "Ziyarat not found" });
      return;
    }
    res.json(ziyarat);
  });

  app.get("/api/ziyarat/personality/:personality", async (req, res) => {
    const ziyarats = await storage.getZiyaratByPersonality(req.params.personality);
    res.json(ziyarats);
  });

  // Aamal routes
  app.get("/api/aamal", async (_req, res) => {
    const aamals = await storage.getAamal();
    res.json(aamals);
  });

  app.get("/api/aamal/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const aamal = await storage.getAamalById(id);
    if (!aamal) {
      res.status(404).json({ message: "Aamal not found" });
      return;
    }
    res.json(aamal);
  });

  app.get("/api/aamal/timing/:timing", async (req, res) => {
    const aamals = await storage.getAamalByTiming(req.params.timing);
    res.json(aamals);
  });

  // Prayer Records routes
  app.get("/api/prayer-records", async (_req, res) => {
    const records = await storage.getPrayerRecords();
    res.json(records);
  });

  app.post("/api/prayer-records", async (req, res) => {
    const record = insertPrayerRecordSchema.parse(req.body);
    const newRecord = await storage.addPrayerRecord(record);
    res.status(201).json(newRecord);
  });

  app.get("/api/prayer-records/date/:date", async (req, res) => {
    const date = new Date(req.params.date);
    const records = await storage.getPrayerRecordsByDate(date);
    res.json(records);
  });

  // Search routes
  app.get("/api/search", async (req, res) => {
    const query = z.string().parse(req.query.q);
    const type = z.enum(["quran", "books"]).parse(req.query.type);

    if (type === "quran") {
      const results = await storage.searchVerses(query);
      res.json(results);
    } else {
      const results = await storage.searchBooks(query);
      res.json(results);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}