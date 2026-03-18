import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  BarChart2,
  CheckCircle2,
  Clock,
  RotateCcw,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Page } from "../App";
import type { Difficulty as AppDifficulty } from "../App";
import { Difficulty, useRecordSession } from "../hooks/useQueries";

interface PracticePageProps {
  difficulty: AppDifficulty;
  navigateTo: (page: Page, difficulty?: AppDifficulty) => void;
}

const passages: Record<
  AppDifficulty,
  { text: string; targetWpm: number; label: string }
> = {
  beginner: {
    label: "Beginner",
    targetWpm: 60,
    text: "The weather today is sunny and warm. People are walking in the park and enjoying the fresh air. Children are playing on the swings while their parents watch nearby. It is a perfect day to be outside and relax in nature.",
  },
  intermediate: {
    label: "Intermediate",
    targetWpm: 80,
    text: "The board of directors met yesterday to discuss the company's quarterly financial results. Revenue increased by fifteen percent compared to the previous year, largely due to the expansion of our digital services. The management team presented a new strategy to improve customer retention and reduce operational costs over the next fiscal year.",
  },
  advanced: {
    label: "Advanced",
    targetWpm: 100,
    text: "In accordance with the provisions outlined in the contractual agreement dated the first of January, both parties hereby acknowledge that the terms and conditions set forth therein shall remain binding and enforceable. Any amendments to said agreement must be submitted in writing and approved by authorized representatives of both organizations prior to implementation.",
  },
  exam: {
    label: "Exam Mock",
    targetWpm: 120,
    text: "The government announced a comprehensive legislative reform package aimed at modernizing the nation's infrastructure, strengthening cybersecurity protocols, and streamlining administrative procedures across all federal departments. Independent analysts suggest the proposed measures, if implemented effectively, could yield substantial economic benefits and significantly enhance the country's competitive position in the global marketplace over the next decade.",
  },
};

type Phase = "ready" | "practicing" | "finished";

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function calcAccuracy(original: string, typed: string): number {
  const origWords = original.trim().split(/\s+/);
  const typedWords = typed.trim().split(/\s+/);
  let correct = 0;
  for (let i = 0; i < origWords.length; i++) {
    if (typedWords[i]?.toLowerCase() === origWords[i].toLowerCase()) correct++;
  }
  return Math.round((correct / origWords.length) * 100);
}

const difficultyToEnum: Record<AppDifficulty, Difficulty> = {
  beginner: Difficulty.beginner,
  intermediate: Difficulty.intermediate,
  advanced: Difficulty.advanced,
  exam: Difficulty.exam,
};

export default function PracticePage({
  difficulty,
  navigateTo,
}: PracticePageProps) {
  const passage = passages[difficulty];
  const totalSeconds = Math.round(
    (countWords(passage.text) / passage.targetWpm) * 60,
  );

  const [phase, setPhase] = useState<Phase>("ready");
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [typed, setTyped] = useState("");
  const [result, setResult] = useState<{
    wpm: number;
    accuracy: number;
  } | null>(null);
  const [startTime, setStartTime] = useState<number>(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recordSession = useRecordSession();

  const finishPractice = useCallback(async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("finished");

    const elapsedMinutes = (Date.now() - startTime) / 60000;
    const wordsTyped = countWords(typed);
    const wpm =
      elapsedMinutes > 0 ? Math.round(wordsTyped / elapsedMinutes) : 0;
    const accuracy = calcAccuracy(passage.text, typed);
    setResult({ wpm, accuracy });

    try {
      await recordSession.mutateAsync({
        wpm: BigInt(wpm),
        accuracy: accuracy / 100,
        difficulty: difficultyToEnum[difficulty],
      });
      toast.success("Session saved!");
    } catch {
      toast.error("Could not save session.");
    }
  }, [difficulty, passage.text, recordSession, startTime, typed]);

  useEffect(() => {
    if (phase === "practicing") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            finishPractice();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, finishPractice]);

  const handleStart = () => {
    setPhase("practicing");
    setStartTime(Date.now());
    setTimeLeft(totalSeconds);
    setTyped("");
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("ready");
    setTimeLeft(totalSeconds);
    setTyped("");
    setResult(null);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const timerPct = ((totalSeconds - timeLeft) / totalSeconds) * 100;
  const timerColor =
    timeLeft < 10 ? "bg-red-500" : timeLeft < 30 ? "bg-orange-500" : "bg-teal";

  return (
    <div className="min-h-screen bg-section-band py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-navy">Practice Session</h1>
            <Badge className="bg-teal text-white border-0">
              {passage.label}
            </Badge>
            <Badge
              variant="outline"
              className="border-border text-muted-foreground"
            >
              Target: {passage.targetWpm} WPM
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Read the passage, then type it as accurately and quickly as
            possible.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {phase !== "finished" ? (
            <motion.div
              key="practice"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              {/* Timer card */}
              <Card
                className="border-border shadow-card"
                data-ocid="practice.panel"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Time Remaining
                    </div>
                    <span
                      className={`text-2xl font-bold tabular-nums ${
                        timeLeft < 10
                          ? "text-red-600"
                          : timeLeft < 30
                            ? "text-orange-600"
                            : "text-navy"
                      }`}
                      data-ocid="practice.loading_state"
                    >
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${timerColor}`}
                      style={{ width: `${timerPct}%` }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Passage */}
              <Card className="border-border shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Passage — Read carefully
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed text-base select-none">
                    {passage.text}
                  </p>
                </CardContent>
              </Card>

              {/* Input */}
              <Card className="border-border shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Your Transcription
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea
                    ref={textareaRef}
                    value={typed}
                    onChange={(e) => setTyped(e.target.value)}
                    disabled={phase === "ready"}
                    placeholder={
                      phase === "ready"
                        ? 'Click "Start Practice" below to begin...'
                        : "Type the passage here..."
                    }
                    className="min-h-[140px] text-base leading-relaxed resize-none focus-visible:ring-teal"
                    data-ocid="practice.textarea"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {countWords(typed)} words typed
                    </span>
                    <div className="flex gap-2">
                      {phase === "ready" && (
                        <Button
                          className="bg-teal hover:bg-teal-dark text-white border-0"
                          onClick={handleStart}
                          data-ocid="practice.primary_button"
                        >
                          Start Practice
                        </Button>
                      )}
                      {phase === "practicing" && (
                        <>
                          <Button
                            variant="outline"
                            onClick={handleReset}
                            data-ocid="practice.secondary_button"
                          >
                            <RotateCcw className="w-4 h-4 mr-1" /> Reset
                          </Button>
                          <Button
                            className="bg-teal hover:bg-teal-dark text-white border-0"
                            onClick={() => finishPractice()}
                            data-ocid="practice.submit_button"
                          >
                            Submit Early
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            /* Results */
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              data-ocid="practice.success_state"
            >
              <Card className="border-border shadow-card">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-teal" />
                    <CardTitle className="text-navy">
                      Session Complete!
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {result && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-section-band rounded-xl p-5 text-center">
                        <div className="text-4xl font-bold text-teal mb-1">
                          {result.wpm}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Words Per Minute
                        </div>
                      </div>
                      <div className="bg-section-band rounded-xl p-5 text-center">
                        <div className="text-4xl font-bold text-navy mb-1">
                          {result.accuracy}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Accuracy
                        </div>
                      </div>
                    </div>
                  )}

                  {result && result.accuracy < 70 && (
                    <div className="flex gap-2 items-start bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm text-orange-800">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      Accuracy below 70%. Focus on precision before increasing
                      speed.
                    </div>
                  )}

                  {result &&
                    result.wpm >= passage.targetWpm &&
                    result.accuracy >= 80 && (
                      <div className="flex gap-2 items-start bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-emerald-800">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                        Excellent! You hit the target speed with good accuracy.
                        Try the next level!
                      </div>
                    )}

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      className="flex-1"
                      data-ocid="practice.secondary_button"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" /> Try Again
                    </Button>
                    <Button
                      className="bg-teal hover:bg-teal-dark text-white border-0 flex-1"
                      onClick={() => navigateTo("dashboard")}
                      data-ocid="practice.primary_button"
                    >
                      <BarChart2 className="w-4 h-4 mr-2" /> View Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
