
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Admin() {
  const { data: prayerRecords } = useQuery(["/api/prayer-records"]);
  const { data: books } = useQuery(["/api/books"]);
  const { data: duas } = useQuery(["/api/duas"]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      
      <Tabs defaultValue="prayers">
        <TabsList>
          <TabsTrigger value="prayers">Prayer Records</TabsTrigger>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="duas">Duas</TabsTrigger>
        </TabsList>

        <div className="mt-6 grid gap-6">
          {prayerRecords?.map((record: any) => (
            <Card key={record.id}>
              <CardHeader>
                <CardTitle>Prayer Record #{record.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Type: {record.prayerType}</p>
                <p>Date: {new Date(record.date).toLocaleDateString()}</p>
                <p>Status: {record.status}</p>
                {record.notes && <p>Notes: {record.notes}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
