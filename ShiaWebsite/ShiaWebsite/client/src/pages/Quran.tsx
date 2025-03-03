import { useQuery } from "@tanstack/react-query";
import { ReadingLayout } from "@/components/layout/ReadingLayout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { QuranVerse } from "@shared/schema";

export default function Quran() {
  const [currentSurah, setCurrentSurah] = useState(1);
  const [verseRange, setVerseRange] = useState({ start: 1, end: 10 });

  const { data: verses, isLoading } = useQuery<QuranVerse[]>({
    queryKey: [`/api/quran/${currentSurah}/${verseRange.start}/${verseRange.end}`]
  });

  const nextPage = () => {
    setVerseRange(prev => ({
      start: prev.end + 1,
      end: prev.end + 10
    }));
  };

  const prevPage = () => {
    if (verseRange.start > 1) {
      setVerseRange(prev => ({
        start: Math.max(1, prev.start - 10),
        end: prev.start - 1
      }));
    }
  };

  const sidebar = (
    <div className="space-y-4">
      <h3 className="font-bold mb-2">Surah Navigation</h3>
      {/* Add surah list here */}
    </div>
  );

  return (
    <ReadingLayout
      title="Holy Quran"
      arabicTitle="القرآن الكريم"
      sidebar={sidebar}
    >
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="space-y-8">
          {verses?.map(verse => (
            <div key={verse.id} className="space-y-4">
              <p className="text-2xl text-right font-arabic leading-loose">
                {verse.arabicText}
              </p>
              <p className="text-muted-foreground">
                {verse.translation}
              </p>
              <p className="text-sm text-muted-foreground">
                {verse.surahNumber}:{verse.verseNumber}
              </p>
            </div>
          ))}
          
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={prevPage}
              disabled={verseRange.start <= 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={nextPage}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </ReadingLayout>
  );
}
