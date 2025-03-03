import { useQuery } from "@tanstack/react-query";
import { ReadingLayout } from "@/components/layout/ReadingLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Dua } from "@shared/schema";

export default function Duas() {
  const { data: duas, isLoading } = useQuery<Dua[]>({
    queryKey: ["/api/duas"]
  });

  return (
    <ReadingLayout title="Duas & Munajaat" arabicTitle="الأدعية والمناجاة">
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {duas?.map(dua => (
            <Card key={dua.id} className="hover:bg-accent/50 transition-colors">
              <CardHeader>
                <CardTitle>
                  <div className="mb-2">{dua.title}</div>
                  {dua.arabicTitle && (
                    <div className="text-lg font-arabic">{dua.arabicTitle}</div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Category: {dua.category}
                </p>
                {dua.occasion && (
                  <p className="text-sm text-muted-foreground">
                    Occasion: {dua.occasion}
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
