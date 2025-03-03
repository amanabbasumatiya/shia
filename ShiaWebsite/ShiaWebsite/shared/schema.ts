import { pgTable, text, serial, integer, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const quranVerses = pgTable("quran_verses", {
  id: serial("id").primaryKey(),
  surahNumber: integer("surah_number").notNull(),
  verseNumber: integer("verse_number").notNull(),
  arabicText: text("arabic_text").notNull(),
  translation: text("translation").notNull(),
});

export const religiousBooks = pgTable("religious_books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  arabicTitle: text("arabic_title"),
  author: text("author").notNull(),
  category: text("category").notNull(),
  content: json("content").$type<{chapter: string, text: string}[]>().notNull(),
});

export const duas = pgTable("duas", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  arabicTitle: text("arabic_title"),
  arabicText: text("arabic_text").notNull(),
  translation: text("translation").notNull(),
  category: text("category").notNull(),
  occasion: text("occasion"),
});

export const ziyarat = pgTable("ziyarat", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  arabicTitle: text("arabic_title"),
  arabicText: text("arabic_text").notNull(),
  translation: text("translation").notNull(),
  location: text("location"),
  personality: text("personality"),
});

export const aamal = pgTable("aamal", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  timing: text("timing").notNull(),
  instructions: json("instructions").$type<string[]>().notNull(),
});

export const prayerRecords = pgTable("prayer_records", {
  id: serial("id").primaryKey(),
  prayerType: text("prayer_type").notNull(),
  date: timestamp("date").notNull(),
  status: text("status").notNull(), // missed, completed, qaza
  notes: text("notes"),
});

// Create a modified prayer record schema that accepts date strings
export const insertPrayerRecordSchema = createInsertSchema(prayerRecords)
  .extend({
    date: z.string().transform(str => new Date(str)),
  });

// Schema creation for other tables
export const insertVerseSchema = createInsertSchema(quranVerses);
export const insertBookSchema = createInsertSchema(religiousBooks);
export const insertDuaSchema = createInsertSchema(duas);
export const insertZiyaratSchema = createInsertSchema(ziyarat);
export const insertAamalSchema = createInsertSchema(aamal);

// Type exports
export type InsertVerse = z.infer<typeof insertVerseSchema>;
export type InsertBook = z.infer<typeof insertBookSchema>;
export type InsertDua = z.infer<typeof insertDuaSchema>;
export type InsertZiyarat = z.infer<typeof insertZiyaratSchema>;
export type InsertAamal = z.infer<typeof insertAamalSchema>;
export type InsertPrayerRecord = z.infer<typeof insertPrayerRecordSchema>;

export type QuranVerse = typeof quranVerses.$inferSelect;
export type ReligiousBook = typeof religiousBooks.$inferSelect;
export type Dua = typeof duas.$inferSelect;
export type Ziyarat = typeof ziyarat.$inferSelect;
export type Aamal = typeof aamal.$inferSelect;
export type PrayerRecord = typeof prayerRecords.$inferSelect;