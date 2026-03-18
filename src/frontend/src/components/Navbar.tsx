import { Button } from "@/components/ui/button";
import { Menu, PenLine, X } from "lucide-react";
import { useState } from "react";
import type { Difficulty, Page } from "../App";

interface NavbarProps {
  currentPage: Page;
  navigateTo: (page: Page, difficulty?: Difficulty) => void;
}

export default function Navbar({ currentPage, navigateTo }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Home", page: "home" as Page },
    { label: "Practice", page: "practice" as Page },
    { label: "Dashboard", page: "dashboard" as Page },
  ];

  return (
    <header className="sticky top-0 z-50 bg-navy shadow-md">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <button
          type="button"
          className="flex items-center gap-2 text-white font-bold text-xl"
          onClick={() => navigateTo("home")}
          data-ocid="nav.link"
        >
          <PenLine className="w-6 h-6 text-teal" />
          <span>ShorthandPro</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.page}
              onClick={() => navigateTo(link.page)}
              data-ocid={`nav.${link.page}.link`}
              className={`text-sm font-medium transition-colors ${
                currentPage === link.page
                  ? "text-teal"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-white/40 text-white bg-transparent hover:bg-white/10 hover:text-white"
            data-ocid="nav.login.button"
          >
            Log In
          </Button>
          <Button
            size="sm"
            className="bg-teal hover:bg-teal-dark text-white border-0"
            onClick={() => navigateTo("practice")}
            data-ocid="nav.signup.button"
          >
            Sign Up
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy-dark border-t border-white/10 px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.page}
              onClick={() => {
                navigateTo(link.page);
                setMobileOpen(false);
              }}
              className={`text-sm font-medium text-left transition-colors ${
                currentPage === link.page ? "text-teal" : "text-white/80"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="border-white/40 text-white bg-transparent hover:bg-white/10 hover:text-white flex-1"
            >
              Log In
            </Button>
            <Button
              size="sm"
              className="bg-teal hover:bg-teal-dark text-white border-0 flex-1"
              onClick={() => {
                navigateTo("practice");
                setMobileOpen(false);
              }}
            >
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
