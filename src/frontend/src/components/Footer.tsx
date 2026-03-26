import { SiFacebook, SiLinkedin, SiX } from "react-icons/si";

function SocialLink({
  Icon,
  href,
  label,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}) {
  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "#6ECFC0";
  };
  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "rgba(255,255,255,0.45)";
  };
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-colors"
      style={{ color: "rgba(255,255,255,0.45)" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Icon className="w-4 h-4" />
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer style={{ backgroundColor: "#002E2C" }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: "#0F6B5F", color: "#fff" }}
              >
                त
              </span>
              <span className="font-semibold text-white text-lg">तक्षशिला</span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              आपकी स्टेनोग्राफी परीक्षा की तैयारी के लिए एक संपूर्ण मंच।
            </p>
            <div className="flex gap-3 mt-4">
              <SocialLink
                Icon={SiX}
                href="https://twitter.com"
                label="Twitter"
              />
              <SocialLink
                Icon={SiFacebook}
                href="https://facebook.com"
                label="Facebook"
              />
              <SocialLink
                Icon={SiLinkedin}
                href="https://linkedin.com"
                label="LinkedIn"
              />
            </div>
          </div>

          {/* Practice */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-white">Practice</h4>
            <ul
              className="space-y-2 text-sm"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {["Beginner", "Intermediate", "Advanced", "Exam Mock"].map(
                (item) => (
                  <li key={item}>
                    <span className="cursor-default hover:text-white transition-colors">
                      {item}
                    </span>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-white">Resources</h4>
            <ul
              className="space-y-2 text-sm"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {["Study Guide", "Speed Tips", "HC PS Format", "FAQ"].map(
                (item) => (
                  <li key={item}>
                    <span className="cursor-default hover:text-white transition-colors">
                      {item}
                    </span>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-white">Contact</h4>
            <ul
              className="space-y-2 text-sm"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              <li>support@takshashila.com</li>
              <li>Mon–Fri, 9am–6pm IST</li>
            </ul>
          </div>
        </div>

        <div
          className="mt-8 pt-6 text-center text-xs"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.40)",
          }}
        >
          © {year}. Built with ❤️ using{" "}
          <a
            href={utmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
