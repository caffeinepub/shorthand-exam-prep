import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Clock,
  FileCheck,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import type { Difficulty, Page } from "../App";

interface HomePageProps {
  navigateTo: (page: Page, difficulty?: Difficulty) => void;
}

const features = [
  {
    icon: Clock,
    title: "Timed Dictations",
    desc: "Practice under real exam conditions with accurate countdown timers matched to each difficulty level.",
  },
  {
    icon: TrendingUp,
    title: "Speed Tracking",
    desc: "Monitor your WPM progress across sessions with visual charts to identify improvement trends.",
  },
  {
    icon: BookOpen,
    title: "Skill Exercises",
    desc: "Structured passages from beginner to advanced, targeting the vocabulary and phrasing used in exams.",
  },
  {
    icon: FileCheck,
    title: "Mock Exams",
    desc: "Full-length exam simulations at 120 WPM to prepare you for the real professional assessment.",
  },
];

const levels = [
  {
    label: "Beginner",
    wpm: 60,
    difficulty: "beginner" as Difficulty,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    desc: "Build foundational speed and accuracy with clear, everyday passages.",
  },
  {
    label: "Intermediate",
    wpm: 80,
    difficulty: "intermediate" as Difficulty,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    desc: "Business and professional language for office and admin roles.",
  },
  {
    label: "Advanced",
    wpm: 100,
    difficulty: "advanced" as Difficulty,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    desc: "Complex legal and contractual text to sharpen precision at pace.",
  },
  {
    label: "Exam Mock",
    wpm: 120,
    difficulty: "exam" as Difficulty,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    desc: "Full government and policy passages matching real exam conditions.",
  },
];

export default function HomePage({ navigateTo }: HomePageProps) {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-[580px] flex items-center justify-center text-center"
        style={{
          backgroundImage: `url('/assets/generated/hero-shorthand.dim_1400x700.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 py-20">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4"
          >
            Master Shorthand.
            <br />
            <span className="text-teal">Ace Your Exams.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-lg md:text-xl text-white/85 mb-8 max-w-xl mx-auto"
          >
            Structured dictation exercises, real-time speed tracking, and full
            mock exams — built for professionals preparing for shorthand
            certification.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              size="lg"
              className="bg-teal hover:bg-teal-dark text-white border-0 text-base px-8"
              onClick={() => navigateTo("practice")}
              data-ocid="hero.primary_button"
            >
              Start Practicing Today
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/50 text-white bg-transparent hover:bg-white/10 hover:text-white text-base px-8"
              onClick={() => navigateTo("dashboard")}
              data-ocid="hero.secondary_button"
            >
              View Dashboard
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-background py-20" id="features">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">
              Everything You Need to Succeed
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              ShorthandPro provides a complete toolkit for exam preparation,
              from first practice to mock certification.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="border-border shadow-card hover:shadow-card-hover transition-shadow h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-icon-bg flex items-center justify-center mb-4">
                      <f.icon className="w-6 h-6 text-navy-icon" />
                    </div>
                    <h3 className="font-semibold text-navy mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {f.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice levels */}
      <section className="bg-section-band py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">
              Choose Your Level
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Start where you are. Progress through structured levels to reach
              exam-ready speed.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {levels.map((lvl, i) => (
              <motion.div
                key={lvl.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-ocid={`levels.item.${i + 1}`}
              >
                <Card
                  className="border-border shadow-card hover:shadow-card-hover transition-all cursor-pointer group h-full"
                  onClick={() => navigateTo("practice", lvl.difficulty)}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mb-4 ${lvl.bg} ${lvl.color} w-fit`}
                    >
                      {lvl.wpm} WPM
                    </div>
                    <h3 className="font-bold text-navy text-lg mb-2">
                      {lvl.label}
                    </h3>
                    <p className="text-sm text-muted-foreground flex-1">
                      {lvl.desc}
                    </p>
                    <div
                      className={`flex items-center gap-1 mt-4 text-sm font-medium ${lvl.color} group-hover:gap-2 transition-all`}
                    >
                      Start practice <ChevronRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-navy py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10,000+", label: "Practice Sessions" },
              { value: "4 Levels", label: "Difficulty Tiers" },
              { value: "120 WPM", label: "Max Exam Speed" },
              { value: "95%", label: "Pass Rate" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="text-3xl font-bold text-teal mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
