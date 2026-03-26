import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BarChart2,
  BookOpen,
  ChevronRight,
  FileCheck,
  Headphones,
  Keyboard,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Difficulty, Page } from "../App";

interface HomePageProps {
  navigateTo: (page: Page, difficulty?: Difficulty) => void;
}

const features = [
  {
    icon: Headphones,
    title: "Court Dictation",
    desc: "Authentic judicial and administrative passages dictated at exam pace for realistic preparation.",
  },
  {
    icon: TrendingUp,
    title: "Speed Training",
    desc: "Progress from 60 WPM to 120 WPM with structured difficulty tiers and instant WPM feedback.",
  },
  {
    icon: BarChart2,
    title: "Progress Tracking",
    desc: "Visual dashboards track your WPM and accuracy over time so you always know where you stand.",
  },
  {
    icon: FileCheck,
    title: "Exam Mock Tests",
    desc: "Full Allahabad HC PS mock exams with official letter formats and 80 WPM + 95% pass criteria.",
  },
];

const levels = [
  {
    label: "Beginner",
    wpm: 60,
    difficulty: "beginner" as Difficulty,
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    label: "Intermediate",
    wpm: 80,
    difficulty: "intermediate" as Difficulty,
    color: "#3B82F6",
    bg: "#EFF6FF",
  },
  {
    label: "Advanced",
    wpm: 100,
    difficulty: "advanced" as Difficulty,
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
  {
    label: "Exam Mock",
    wpm: 120,
    difficulty: "exam" as Difficulty,
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
];

const sampleWpm = [
  { day: "Mon", wpm: 62 },
  { day: "Tue", wpm: 68 },
  { day: "Wed", wpm: 71 },
  { day: "Thu", wpm: 75 },
  { day: "Fri", wpm: 78 },
  { day: "Sat", wpm: 82 },
  { day: "Sun", wpm: 87 },
];

const HERO_BG =
  "linear-gradient(135deg, #002E2C 0%, #004d4a 60%, #0B3D35 100%)";
const PATTERN_BG =
  "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)";

export default function HomePage({ navigateTo }: HomePageProps) {
  return (
    <div style={{ backgroundColor: "#F3F5F6" }}>
      {/* ─── Hero ─────────────────────────────────────────── */}
      <section
        className="relative flex items-center justify-center text-center"
        style={{ minHeight: "62vh", background: HERO_BG }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: PATTERN_BG, backgroundSize: "30px 30px" }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
            style={{
              backgroundColor: "rgba(15,107,95,0.35)",
              color: "#6ECFC0",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Allahabad HC PS Exam Preparation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-5xl md:text-6xl font-bold text-white leading-tight mb-5"
            style={{ letterSpacing: "-0.02em" }}
          >
            Master Stenography.
            <br />
            <span style={{ color: "#6ECFC0" }}>Speed Up Your Skills.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg text-white/75 mb-10 max-w-xl mx-auto leading-relaxed"
          >
            Structured dictation exercises, real-time WPM tracking, and full HC
            PS mock exams — everything you need in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              size="lg"
              className="text-white border-0 text-base px-8 rounded-lg font-medium"
              style={{ backgroundColor: "#0F6B5F" }}
              onClick={() => navigateTo("practice")}
              data-ocid="hero.primary_button"
            >
              Start Practicing
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white text-base px-8 rounded-lg font-medium"
              onClick={() => navigateTo("dashboard")}
              data-ocid="hero.secondary_button"
            >
              View Dashboard
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap justify-center gap-8 mt-14 text-sm text-white/60"
          >
            {[
              "4 Difficulty Levels",
              "12+ Practice Passages",
              "Real HC PS Criteria",
              "Instant WPM Score",
            ].map((s) => (
              <span key={s} className="flex items-center gap-1.5">
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: "#0F6B5F" }}
                />
                {s}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Key Features ─────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl font-bold mb-3"
              style={{ color: "#1F2A33" }}
            >
              Key Features
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Everything you need for exam-ready stenography practice.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className="h-full shadow-card hover:shadow-card-hover transition-shadow"
                  style={{ borderColor: "#E6EAED", borderRadius: "12px" }}
                >
                  <CardContent className="p-6">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: "rgba(15,107,95,0.10)" }}
                    >
                      <f.icon
                        className="w-5 h-5"
                        style={{ color: "#0F6B5F" }}
                      />
                    </div>
                    <h3
                      className="font-semibold mb-2 text-base"
                      style={{ color: "#1F2A33" }}
                    >
                      {f.title}
                    </h3>
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

      {/* ─── Learning Dashboard Preview ──────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: "#fff" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-3"
                style={{ color: "#0F6B5F" }}
              >
                Your Learning Dashboard
              </p>
              <h2
                className="text-3xl font-bold mb-4"
                style={{ color: "#1F2A33" }}
              >
                Track Every Session,
                <br />
                See Real Progress
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Every practice session is logged. View WPM trends, accuracy
                charts, and a full session history so you can see exactly how
                your speed and precision improve over time.
              </p>
              <Button
                className="text-white border-0 rounded-lg"
                style={{ backgroundColor: "#0F6B5F" }}
                onClick={() => navigateTo("dashboard")}
                data-ocid="dashboard_preview.primary_button"
              >
                Open Dashboard <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card
                className="shadow-card"
                style={{ borderColor: "#E6EAED", borderRadius: "12px" }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4
                      className="font-semibold text-sm"
                      style={{ color: "#1F2A33" }}
                    >
                      WPM This Week
                    </h4>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: "#ECFDF5", color: "#10B981" }}
                    >
                      +25 WPM ↑
                    </span>
                  </div>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={sampleWpm}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E6EAED" />
                      <XAxis
                        dataKey="day"
                        tick={{ fontSize: 11, fill: "#8ea5b0" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "#8ea5b0" }}
                        axisLine={false}
                        tickLine={false}
                        domain={[50, 100]}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "8px",
                          border: "1px solid #E6EAED",
                          fontSize: "12px",
                        }}
                        formatter={(v) => [`${v} WPM`, "Speed"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="wpm"
                        stroke="#0F6B5F"
                        strokeWidth={2.5}
                        dot={{ fill: "#0F6B5F", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <div
                    className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t"
                    style={{ borderColor: "#E6EAED" }}
                  >
                    {[
                      { label: "Avg WPM", value: "75" },
                      { label: "Best", value: "87" },
                      { label: "Sessions", value: "7" },
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <div
                          className="text-lg font-bold"
                          style={{ color: "#0F6B5F" }}
                        >
                          {s.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Daily Practice Session preview ──────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: "#F3F5F6" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl font-bold mb-3"
              style={{ color: "#1F2A33" }}
            >
              Daily Practice Session
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Select a passage, listen to the audio, type your transcription,
              and get instant results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <Card
                className="h-full shadow-card"
                style={{ borderColor: "#E6EAED", borderRadius: "12px" }}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: "rgba(0,46,44,0.08)" }}
                  >
                    <Keyboard
                      className="w-5 h-5"
                      style={{ color: "#0F6B5F" }}
                    />
                  </div>
                  <h3
                    className="font-semibold text-base mb-2"
                    style={{ color: "#1F2A33" }}
                  >
                    HC PS Typing Test
                  </h3>
                  <p className="text-sm text-muted-foreground flex-1 mb-4">
                    Official government letter format. 80 WPM + 95% accuracy for
                    PASS.
                  </p>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: "rgba(15,107,95,0.10)",
                        color: "#0F6B5F",
                      }}
                    >
                      80 WPM min
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: "rgba(0,46,44,0.08)",
                        color: "#002E2C",
                      }}
                    >
                      95% accuracy
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="text-white border-0 w-full rounded-lg"
                    style={{ backgroundColor: "#0F6B5F" }}
                    onClick={() => navigateTo("typing-test")}
                    data-ocid="home.typing_test.primary_button"
                  >
                    Open Typing Test <ArrowRight className="ml-2 w-3 h-3" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card
                className="h-full shadow-card"
                style={{ borderColor: "#E6EAED", borderRadius: "12px" }}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: "rgba(0,46,44,0.08)" }}
                  >
                    <Headphones
                      className="w-5 h-5"
                      style={{ color: "#0F6B5F" }}
                    />
                  </div>
                  <h3
                    className="font-semibold text-base mb-2"
                    style={{ color: "#1F2A33" }}
                  >
                    Shorthand Dictation
                  </h3>
                  <p className="text-sm text-muted-foreground flex-1 mb-4">
                    Listen to 12 professional passages at 80/100/120 WPM. Type
                    and get colour-coded feedback.
                  </p>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: "rgba(15,107,95,0.10)",
                        color: "#0F6B5F",
                      }}
                    >
                      12 passages
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: "rgba(0,46,44,0.08)",
                        color: "#002E2C",
                      }}
                    >
                      Audio TTS
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="text-white border-0 w-full rounded-lg"
                    style={{ backgroundColor: "#002E2C" }}
                    onClick={() => navigateTo("shorthand")}
                    data-ocid="home.shorthand.primary_button"
                  >
                    Open Shorthand <ArrowRight className="ml-2 w-3 h-3" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card
                className="h-full shadow-card"
                style={{ borderColor: "#E6EAED", borderRadius: "12px" }}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: "rgba(0,46,44,0.08)" }}
                  >
                    <BookOpen
                      className="w-5 h-5"
                      style={{ color: "#0F6B5F" }}
                    />
                  </div>
                  <h3
                    className="font-semibold text-base mb-2"
                    style={{ color: "#1F2A33" }}
                  >
                    Choose Your Level
                  </h3>
                  <p className="text-sm text-muted-foreground flex-1 mb-4">
                    Start at Beginner and work up to Exam Mock. Each level has
                    3+ passages.
                  </p>
                  <div className="flex flex-col gap-2 mt-auto">
                    {levels.map((lvl) => (
                      <button
                        key={lvl.label}
                        type="button"
                        className="flex items-center justify-between text-sm px-3 py-2 rounded-lg transition-colors hover:opacity-90"
                        style={{ backgroundColor: lvl.bg, color: lvl.color }}
                        onClick={() => navigateTo("practice", lvl.difficulty)}
                      >
                        <span className="font-medium">{lvl.label}</span>
                        <span className="flex items-center gap-1 font-semibold">
                          {lvl.wpm} WPM <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Stats band ───────────────────────────────────── */}
      <section className="py-16 px-6" style={{ backgroundColor: "#002E2C" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10,000+", label: "Practice Sessions" },
              { value: "4 Levels", label: "Difficulty Tiers" },
              { value: "120 WPM", label: "Max Exam Speed" },
              { value: "95%", label: "HC PS Pass Rate" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ color: "#6ECFC0" }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
