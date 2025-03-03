import { 
  quranVerses, religiousBooks, duas, ziyarat, aamal, prayerRecords,
  type QuranVerse, type ReligiousBook, type Dua, type Ziyarat, type Aamal, type PrayerRecord,
  type InsertVerse, type InsertBook, type InsertDua, type InsertZiyarat, type InsertAamal, type InsertPrayerRecord 
} from "@shared/schema";

export interface IStorage {
  // Quran operations
  getVerse(surah: number, verse: number): Promise<QuranVerse | undefined>;
  getVersesByRange(surah: number, startVerse: number, endVerse: number): Promise<QuranVerse[]>;
  searchVerses(query: string): Promise<QuranVerse[]>;

  // Books operations
  getBooks(): Promise<ReligiousBook[]>;
  getBook(id: number): Promise<ReligiousBook | undefined>;
  searchBooks(query: string): Promise<ReligiousBook[]>;

  // Dua operations
  getDuas(): Promise<Dua[]>;
  getDua(id: number): Promise<Dua | undefined>;
  getDuasByCategory(category: string): Promise<Dua[]>;

  // Ziyarat operations
  getZiyarat(): Promise<Ziyarat[]>;
  getZiyaratById(id: number): Promise<Ziyarat | undefined>;
  getZiyaratByPersonality(personality: string): Promise<Ziyarat[]>;

  // Aamal operations
  getAamal(): Promise<Aamal[]>;
  getAamalById(id: number): Promise<Aamal | undefined>;
  getAamalByTiming(timing: string): Promise<Aamal[]>;

  // Prayer records operations
  getPrayerRecords(): Promise<PrayerRecord[]>;
  addPrayerRecord(record: InsertPrayerRecord): Promise<PrayerRecord>;
  getPrayerRecordsByDate(date: Date): Promise<PrayerRecord[]>;
}

export class MemStorage implements IStorage {
  private verses: Map<string, QuranVerse>;
  private books: Map<number, ReligiousBook>;
  private duaList: Map<number, Dua>;
  private ziyaratList: Map<number, Ziyarat>;
  private aamalList: Map<number, Aamal>;
  private prayerRecordList: Map<number, PrayerRecord>;

  constructor() {
    this.verses = new Map();
    this.books = new Map();
    this.duaList = new Map();
    this.ziyaratList = new Map();
    this.aamalList = new Map();
    this.prayerRecordList = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Initialize with sample data
    const sampleVerse: QuranVerse = {
      id: 1,
      surahNumber: 1,
      verseNumber: 1,
      arabicText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      translation: "In the name of Allah, the Most Gracious, the Most Merciful"
    };
    this.verses.set("1:1", sampleVerse);

    const sampleBook: ReligiousBook = {
      id: 1,
      title: "Nahjul Balagha",
      arabicTitle: "نهج البلاغة",
      author: "Sharif Razi",
      category: "Sermons",
      content: [
        {
          chapter: "Sermon 1",
          text: "Praise belongs to Allah whose worth cannot be described by speakers..."
        }
      ]
    };
    this.books.set(1, sampleBook);

    // Sample Dua
    const sampleDua: Dua = {
      id: 1,
      title: "Dua Kumail",
      arabicTitle: "دعاء كميل",
      arabicText: "اللَّهُمَّ إِنِّي أَسْأَلُكَ بِرَحْمَتِكَ",
      translation: "O Allah, I ask You by Your mercy",
      category: "Weekly",
      occasion: "Thursday Night"
    };
    this.duaList.set(1, sampleDua);

    // Sample Ziyarat
    const sampleZiyarat: Ziyarat = {
      id: 1,
      title: "Ziyarat Ashura",
      arabicTitle: "زيارة عاشوراء",
      arabicText: "السَّلامُ عَلَيْكَ يا أَبا عَبْدِ اللهِ",
      translation: "Peace be upon you, O Aba Abdillah",
      location: "Karbala",
      personality: "Imam Hussain (a.s)"
    };
    this.ziyaratList.set(1, sampleZiyarat);
  }

  // Implement existing methods
  async getVerse(surah: number, verse: number): Promise<QuranVerse | undefined> {
    return this.verses.get(`${surah}:${verse}`);
  }

  async getVersesByRange(surah: number, startVerse: number, endVerse: number): Promise<QuranVerse[]> {
    return Array.from(this.verses.values()).filter(v => 
      v.surahNumber === surah && 
      v.verseNumber >= startVerse && 
      v.verseNumber <= endVerse
    );
  }

  async searchVerses(query: string): Promise<QuranVerse[]> {
    return Array.from(this.verses.values()).filter(v =>
      v.arabicText.includes(query) || v.translation.toLowerCase().includes(query.toLowerCase())
    );
  }

  async getBooks(): Promise<ReligiousBook[]> {
    return Array.from(this.books.values());
  }

  async getBook(id: number): Promise<ReligiousBook | undefined> {
    return this.books.get(id);
  }

  async searchBooks(query: string): Promise<ReligiousBook[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.books.values()).filter(b =>
      b.title.toLowerCase().includes(lowercaseQuery) ||
      b.author.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Implement new methods
  async getDuas(): Promise<Dua[]> {
    return Array.from(this.duaList.values());
  }

  async getDua(id: number): Promise<Dua | undefined> {
    return this.duaList.get(id);
  }

  async getDuasByCategory(category: string): Promise<Dua[]> {
    return Array.from(this.duaList.values()).filter(d => d.category === category);
  }

  async getZiyarat(): Promise<Ziyarat[]> {
    return Array.from(this.ziyaratList.values());
  }

  async getZiyaratById(id: number): Promise<Ziyarat | undefined> {
    return this.ziyaratList.get(id);
  }

  async getZiyaratByPersonality(personality: string): Promise<Ziyarat[]> {
    return Array.from(this.ziyaratList.values()).filter(z => z.personality === personality);
  }

  async getAamal(): Promise<Aamal[]> {
    return Array.from(this.aamalList.values());
  }

  async getAamalById(id: number): Promise<Aamal | undefined> {
    return this.aamalList.get(id);
  }

  async getAamalByTiming(timing: string): Promise<Aamal[]> {
    return Array.from(this.aamalList.values()).filter(a => a.timing === timing);
  }

  async getPrayerRecords(): Promise<PrayerRecord[]> {
    return Array.from(this.prayerRecordList.values());
  }

  async addPrayerRecord(record: InsertPrayerRecord): Promise<PrayerRecord> {
    const id = this.prayerRecordList.size + 1;
    const newRecord = { ...record, id };
    this.prayerRecordList.set(id, newRecord);
    return newRecord;
  }

  async getPrayerRecordsByDate(date: Date): Promise<PrayerRecord[]> {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    return Array.from(this.prayerRecordList.values()).filter(record => {
      const recordDate = new Date(record.date);
      recordDate.setHours(0, 0, 0, 0);
      return recordDate.getTime() === targetDate.getTime();
    });
  }
}

export const storage = new MemStorage();