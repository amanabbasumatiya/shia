import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/layout/Navbar";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Quran from "@/pages/Quran";
import Books from "@/pages/Books";
import Duas from "@/pages/Duas";
import Ziyarat from "@/pages/Ziyarat";
import Aamal from "@/pages/Aamal";
import Tools from "@/pages/Tools";
import Prayers from "@/pages/Prayers";
import Calendar from "@/pages/Calendar";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/quran" component={Quran} />
      <Route path="/books" component={Books} />
      <Route path="/duas" component={Duas} />
      <Route path="/ziyarat" component={Ziyarat} />
      <Route path="/aamal" component={Aamal} />
      <Route path="/tools" component={Tools} />
      <Route path="/prayers" component={Prayers} />
      <Route path="/calendar" component={Calendar} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Router />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;