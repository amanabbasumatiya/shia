import { useQuery, useMutation } from "@tanstack/react-query";
import { ReadingLayout } from "@/components/layout/ReadingLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import type { PrayerRecord } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";

const PRAYER_TYPES = [
  "Fajr",
  "Dhuhr",
  "Asr",
  "Maghrib",
  "Isha"
];

export default function Prayers() {
  const today = new Date();
  const formattedDate = format(today, 'yyyy-MM-dd');

  const { data: records, isLoading } = useQuery<PrayerRecord[]>({
    queryKey: [`/api/prayer-records/date/${formattedDate}`]
  });

  const addPrayerMutation = useMutation({
    mutationFn: async (data: { prayerType: string; status: string }) => {
      return apiRequest('POST', '/api/prayer-records', {
        ...data,
        date: formattedDate,
        notes: null
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/prayer-records/date/${formattedDate}`] });
    }
  });

  const markPrayer = (prayerType: string, status: 'completed' | 'missed' | 'qaza') => {
    addPrayerMutation.mutate({ prayerType, status });
  };

  return (
    <ReadingLayout title="Prayer Tracker" arabicTitle="متابعة الصلاة">
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Today's Prayers</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {PRAYER_TYPES.map(prayerType => {
              const record = records?.find(r => r.prayerType === prayerType);

              return (
                <Card key={prayerType} className={`
                  hover:bg-accent/50 transition-colors
                  ${record?.status === 'completed' ? 'bg-green-50' : 
                    record?.status === 'missed' ? 'bg-red-50' : 
                    record?.status === 'qaza' ? 'bg-yellow-50' : ''}
                `}>
                  <CardHeader>
                    <CardTitle>{prayerType}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {record ? (
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground capitalize">
                          Status: {record.status}
                        </p>
                        {record.notes && (
                          <p className="text-sm text-muted-foreground">
                            Notes: {record.notes}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex-1"
                          onClick={() => markPrayer(prayerType, 'completed')}
                        >
                          Completed
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex-1"
                          onClick={() => markPrayer(prayerType, 'qaza')}
                        >
                          Qaza
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </ReadingLayout>
  );
}