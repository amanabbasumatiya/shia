import { useQuery } from "@tanstack/react-query";
import { ReadingLayout } from "@/components/layout/ReadingLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Aamal } from "@shared/schema";

export default function Aamal() {
  const { data: aamals, isLoading } = useQuery<Aamal[]>({
    queryKey: ["/api/aamal"]
  });

  return (
    <ReadingLayout title="Aamal" arabicTitle="الأعمال">
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {aamals?.map(aamal => (
            <Card key={aamal.id} className="hover:bg-accent/50 transition-colors">
              <CardHeader>
                <CardTitle>{aamal.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {aamal.description}
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  Timing: {aamal.timing}
                </p>
                <div className="space-y-2">
                  {aamal.instructions.map((instruction, index) => (
                    <p key={index} className="text-sm">
                      {index + 1}. {instruction}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </ReadingLayout>
  );
}
