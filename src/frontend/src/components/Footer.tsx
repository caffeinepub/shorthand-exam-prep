import { PenLine } from "lucide-react";
import { SiFacebook, SiLinkedin, SiX } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="bg-gray-50 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo + desc */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <PenLine className="w-5 h-5 text-teal" />
              <span className="font-bold text-navy text-lg">ShorthandPro</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Master shorthand writing and ace your professional exams with
              structured practice.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-teal transition-colors"
              >
                <SiX className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-teal transition-colors"
              >
                <SiFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-teal transition-colors"
              >
                <SiLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Practice */}
          <div>
            <h4 className="font-semibold text-navy text-sm mb-3">Practice</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Beginner", "Intermediate", "Advanced", "Exam Mock"].map(
                (item) => (
                  <li key={item}>
                    <span className="hover:text-teal transition-colors cursor-default">
                      {item}
                    </span>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-navy text-sm mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Study Guide", "Speed Tips", "Exam Formats", "FAQ"].map(
                (item) => (
                  <li key={item}>
                    <span className="hover:text-teal transition-colors cursor-default">
                      {item}
                    </span>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-navy text-sm mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>support@shorthandpro.com</li>
              <li>Mon–Fri, 9am–5pm EST</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
          © {year}. Built with ❤️ using{" "}
          <a
            href={utmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal transition-colors"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
