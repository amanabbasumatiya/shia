import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ReadingLayoutProps {
  title: string;
  arabicTitle?: string;
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

export function ReadingLayout({ title, arabicTitle, children, sidebar }: ReadingLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {sidebar && (
          <aside className="w-full md:w-64 shrink-0">
            <Card className="p-4">
              {sidebar}
            </Card>
          </aside>
        )}
        
        <main className="flex-1">
          <Card className="p-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">{title}</h1>
              {arabicTitle && (
                <h2 className="text-xl font-arabic">{arabicTitle}</h2>
              )}
            </div>
            
            <ScrollArea className="h-[70vh]">
              <div className="prose prose-lg max-w-none">
                {children}
              </div>
            </ScrollArea>
          </Card>
        </main>
      </div>
    </div>
  );
}
