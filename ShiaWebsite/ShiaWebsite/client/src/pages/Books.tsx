import { useQuery } from "@tanstack/react-query";
import { ReadingLayout } from "@/components/layout/ReadingLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { ReligiousBook } from "@shared/schema";

export default function Books() {
  const { data: books, isLoading } = useQuery<ReligiousBook[]>({
    queryKey: ["/api/books"]
  });

  return (
    <ReadingLayout title="Religious Books" arabicTitle="الكتب الدينية">
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {books?.map(book => (
            <Card key={book.id} className="hover:bg-accent/50 transition-colors">
              <CardHeader>
                <CardTitle>
                  <div className="mb-2">{book.title}</div>
                  {book.arabicTitle && (
                    <div className="text-lg font-arabic">{book.arabicTitle}</div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  By {book.author}
                </p>
                <p className="text-sm text-muted-foreground">
                  Category: {book.category}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </ReadingLayout>
  );
}
