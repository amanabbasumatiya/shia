import { ReadingLayout } from "@/components/layout/ReadingLayout";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useState } from "react";

// Sample Islamic events data
const ISLAMIC_EVENTS = [
  { date: "1445-07-10", title: "Ramadan Begins", arabicTitle: "بداية شهر رمضان" },
  { date: "1445-07-27", title: "Laylat al-Qadr", arabicTitle: "ليلة القدر" },
  { date: "1445-08-01", title: "Eid ul-Fitr", arabicTitle: "عيد الفطر" },
  { date: "1445-12-10", title: "Eid ul-Adha", arabicTitle: "عيد الأضحى" },
  { date: "1445-01-10", title: "Islamic New Year", arabicTitle: "رأس السنة الهجرية" },
  { date: "1445-02-10", title: "Day of Ashura", arabicTitle: "يوم عاشوراء" },
];

export default function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<typeof ISLAMIC_EVENTS[0] | null>(null);

  return (
    <ReadingLayout 
      title="Islamic Calendar" 
      arabicTitle="التقويم الهجري"
      sidebar={
        <div className="space-y-4">
          <h3 className="font-bold flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Select Date
          </h3>
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
      }
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Important Islamic Dates</h2>
            <div className="space-y-4">
              {ISLAMIC_EVENTS.map((event, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="font-semibold">{event.title}</div>
                  <div className="text-lg font-arabic">{event.arabicTitle}</div>
                  <div className="text-sm text-muted-foreground">{event.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedEvent && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Selected Event Details</h3>
              <div className="space-y-2">
                <p className="font-semibold">{selectedEvent.title}</p>
                <p className="text-lg font-arabic">{selectedEvent.arabicTitle}</p>
                <p className="text-sm text-muted-foreground">Date: {selectedEvent.date}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ReadingLayout>
  );
}