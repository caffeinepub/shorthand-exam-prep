import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { Difficulty, Page } from "../App";

interface NavbarProps {
  currentPage: Page;
  navigateTo: (page: Page, difficulty?: Difficulty) => void;
}

export default function Navbar({ currentPage, navigateTo }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Dashboard", page: "dashboard" as Page },
    { label: "Practice", page: "practice" as Page },
    { label: "Library", page: "shorthand" as Page },
    { label: "Progress", page: "dashboard" as Page },
    { label: "Typing Test", page: "typing-test" as Page },
  ];

  return (
    <header
      className="sticky top-0 z-50"
      style={{ backgroundColor: "#002E2C" }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Brand */}
        <button
          type="button"
          className="flex items-center gap-2 text-white font-semibold text-xl tracking-tight"
          onClick={() => navigateTo("home")}
          data-ocid="nav.link"
        >
          {/* त monogram */}
          <span
            className="w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold"
            style={{ backgroundColor: "#0F6B5F", color: "#fff" }}
          >
            त
          </span>
          <span>तक्षशिला</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.label}
              onClick={() => navigateTo(link.page)}
              data-ocid={`nav.${link.page}.link`}
              className={`text-sm font-medium transition-colors ${
                currentPage === link.page
                  ? "text-white"
                  : "text-white/65 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right side: CTA + Avatar */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            size="sm"
            className="text-white border-0 text-sm font-medium px-4"
            style={{ backgroundColor: "#0F6B5F" }}
            onClick={() => navigateTo("practice")}
            data-ocid="nav.signup.button"
          >
            Start Free
          </Button>
          <Avatar className="w-8 h-8 cursor-pointer">
            <AvatarFallback
              className="text-xs font-semibold"
              style={{ backgroundColor: "#0F6B5F", color: "#fff" }}
            >
              त
            </AvatarFallback>
          </Avatar>
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
        <div
          className="md:hidden border-t border-white/10 px-6 py-4 flex flex-col gap-3"
          style={{ backgroundColor: "#003835" }}
        >
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.label}
              onClick={() => {
                navigateTo(link.page);
                setMobileOpen(false);
              }}
              className={`text-sm font-medium text-left transition-colors ${
                currentPage === link.page ? "text-white" : "text-white/65"
              }`}
            >
              {link.label}
            </button>
          ))}
          <Button
            size="sm"
            className="text-white border-0 mt-2"
            style={{ backgroundColor: "#0F6B5F" }}
            onClick={() => {
              navigateTo("practice");
              setMobileOpen(false);
            }}
          >
            Start Free
          </Button>
        </div>
      )}
    </header>
  );
}
