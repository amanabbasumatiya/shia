import { useQuery } from "@tanstack/react-query";
import { ReadingLayout } from "@/components/layout/ReadingLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Ziyarat } from "@shared/schema";

export default function Ziyarat() {
  const { data: ziyarats, isLoading } = useQuery<Ziyarat[]>({
    queryKey: ["/api/ziyarat"]
  });

  return (
    <ReadingLayout title="Ziyarat" arabicTitle="الزيارات">
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {ziyarats?.map(ziyarat => (
            <Card key={ziyarat.id} className="hover:bg-accent/50 transition-colors">
              <CardHeader>
                <CardTitle>
                  <div className="mb-2">{ziyarat.title}</div>
                  {ziyarat.arabicTitle && (
                    <div className="text-lg font-arabic">{ziyarat.arabicTitle}</div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {ziyarat.personality && (
                  <p className="text-sm text-muted-foreground mb-2">
                    Personality: {ziyarat.personality}
                  </p>
                )}
                {ziyarat.location && (
                  <p className="text-sm text-muted-foreground">
                    Location: {ziyarat.location}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </ReadingLayout>
  );
}
