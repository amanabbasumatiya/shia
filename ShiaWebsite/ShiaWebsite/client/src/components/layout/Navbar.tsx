import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { SearchBar } from "../search/SearchBar";

export function Navbar() {
  return (
    <nav className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/">
            <span className="text-2xl font-bold cursor-pointer">مكتبة الشيعة</span>
          </Link>
          <div className="hidden lg:flex space-x-4">
            <Link href="/quran">
              <Button variant="link" className="text-primary-foreground">
                Holy Quran
              </Button>
            </Link>
            <Link href="/books">
              <Button variant="link" className="text-primary-foreground">
                Books
              </Button>
            </Link>
            <Link href="/duas">
              <Button variant="link" className="text-primary-foreground">
                Duas
              </Button>
            </Link>
            <Link href="/ziyarat">
              <Button variant="link" className="text-primary-foreground">
                Ziyarat
              </Button>
            </Link>
            <Link href="/aamal">
              <Button variant="link" className="text-primary-foreground">
                Aamal
              </Button>
            </Link>
            <Link href="/tools">
              <Button variant="link" className="text-primary-foreground">
                Tools
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}