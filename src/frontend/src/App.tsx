import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import PracticePage from "./pages/PracticePage";

export type Page = "home" | "practice" | "dashboard";
export type Difficulty = "beginner" | "intermediate" | "advanced" | "exam";

const queryClient = new QueryClient();

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>("beginner");

  const navigateTo = (page: Page, difficulty?: Difficulty) => {
    if (difficulty) setSelectedDifficulty(difficulty);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Navbar currentPage={currentPage} navigateTo={navigateTo} />
        <main className="flex-1">
          {currentPage === "home" && <HomePage navigateTo={navigateTo} />}
          {currentPage === "practice" && (
            <PracticePage
              difficulty={selectedDifficulty}
              navigateTo={navigateTo}
            />
          )}
          {currentPage === "dashboard" && (
            <DashboardPage navigateTo={navigateTo} />
          )}
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
