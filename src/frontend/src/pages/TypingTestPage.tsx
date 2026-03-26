import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  CheckCircle2,
  Clock,
  FileText,
  Italic,
  RotateCcw,
  Underline,
  Upload,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Page } from "../App";

interface Props {
  navigateTo: (page: Page) => void;
}

// Formatting types
type Alignment = "left" | "center" | "right" | "justify";

interface FormattedWord {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  alignment?: Alignment;
}

interface FormattedLine {
  words: FormattedWord[];
  alignment: Alignment;
}

interface FormattedPassage {
  id: number;
  title: string;
  lines: FormattedLine[];
  plainText: string;
}

// Helper to build formatted passage
function makeLine(
  text: string,
  alignment: Alignment = "left",
  opts?: { bold?: boolean; italic?: boolean; underline?: boolean },
): FormattedLine {
  return {
    alignment,
    words: text.trim()
      ? text
          .split(" ")
          .filter(Boolean)
          .map((w) => ({ text: w, ...opts }))
      : [],
  };
}

const passages: FormattedPassage[] = [
  {
    id: 1,
    title: "Office Order – Promotion",
    lines: [
      makeLine("ALLAHABAD HIGH COURT", "center", {
        bold: true,
        underline: true,
      }),
      makeLine("Office Order No. AHC/ADM/2024/0412", "center"),
      makeLine("", "left"),
      makeLine("Date: 15th March, 2024", "right"),
      makeLine("", "left"),
      makeLine("SUBJECT: Promotion of Judicial Staff to Senior Grade", "left", {
        bold: true,
        underline: true,
      }),
      makeLine("", "left"),
      makeLine("To,", "left"),
      makeLine("All Concerned Officers", "left"),
      makeLine("Allahabad High Court, Prayagraj", "left"),
      makeLine("", "left"),
      makeLine(
        "In exercise of the powers conferred under Article 229 of the Constitution of India and in accordance with the Allahabad High Court Staff Service Rules, 2001, the Hon'ble Chief Justice is pleased to order the promotion of the following officials to the next higher grade with immediate effect:",
        "justify",
      ),
      makeLine("", "left"),
      makeLine(
        "1. Shri Ramesh Kumar Verma (Emp. No. 14521) – promoted from Junior Clerk to Senior Clerk in Pay Level-4.",
        "left",
      ),
      makeLine(
        "2. Smt. Anjali Srivastava (Emp. No. 14789) – promoted from Senior Clerk to Head Clerk in Pay Level-5.",
        "left",
      ),
      makeLine(
        "3. Shri Deepak Mishra (Emp. No. 15001) – promoted from Head Clerk to Assistant (Grade-I) in Pay Level-6.",
        "left",
      ),
      makeLine("", "left"),
      makeLine(
        "The promotions shall be subject to satisfactory completion of the prescribed probation period of one year. The officials are directed to submit their joining reports to the Administrative Section within three working days from the date of this order.",
        "justify",
      ),
      makeLine("", "left"),
      makeLine("By Order of the Hon'ble Chief Justice", "left"),
      makeLine("", "left"),
      makeLine("Registrar General", "right"),
      makeLine("Allahabad High Court, Prayagraj", "right"),
    ],
    plainText: "",
  },
  {
    id: 2,
    title: "Government Letter – Inquiry",
    lines: [
      makeLine("OFFICE OF THE REGISTRAR GENERAL", "center", { bold: true }),
      makeLine("ALLAHABAD HIGH COURT, PRAYAGRAJ", "center", { bold: true }),
      makeLine("", "left"),
      makeLine("No. AHC/REG/2024/0556", "left"),
      makeLine("Dated: 22nd April, 2024", "right"),
      makeLine("", "left"),
      makeLine("To,", "left"),
      makeLine("The District Judge,", "left"),
      makeLine("District Court, Lucknow", "left"),
      makeLine("", "left"),
      makeLine(
        "SUBJECT: Submission of Annual Performance Report for the Year 2023-24",
        "left",
        { bold: true, underline: true },
      ),
      makeLine("", "left"),
      makeLine("Sir,", "left"),
      makeLine("", "left"),
      makeLine(
        "I am directed to bring to your kind notice that the Annual Performance Reports (APRs) of subordinate judicial officers under your jurisdiction for the year 2023-24 were due to be submitted to this office by 31st March, 2024. It has been observed that the said reports have not been received in this office so far.",
        "justify",
      ),
      makeLine("", "left"),
      makeLine(
        "2. You are, therefore, requested to ensure that the APRs of all judicial officers under your charge are forwarded to this office without further delay and in any case not later than 30th April, 2024.",
        "justify",
      ),
      makeLine("", "left"),
      makeLine(
        "3. The matter may be treated as Most Urgent. Non-compliance shall be viewed seriously and appropriate action shall be initiated.",
        "justify",
      ),
      makeLine("", "left"),
      makeLine("Yours faithfully,", "left"),
      makeLine("", "left"),
      makeLine("Deputy Registrar (Administration)", "right"),
      makeLine("Allahabad High Court, Prayagraj", "right"),
    ],
    plainText: "",
  },
  {
    id: 3,
    title: "Court Notice – Contempt",
    lines: [
      makeLine("IN THE HIGH COURT OF JUDICATURE AT ALLAHABAD", "center", {
        bold: true,
      }),
      makeLine("", "left"),
      makeLine("CONTEMPT OF COURT NOTICE", "center", {
        bold: true,
        underline: true,
      }),
      makeLine("Notice No. AHC/CC/2024/00891", "center"),
      makeLine("", "left"),
      makeLine("Date: 10th May, 2024", "right"),
      makeLine("", "left"),
      makeLine("To,", "left"),
      makeLine("Shri Arvind Kumar Gupta", "left"),
      makeLine("Son of Shri Hari Shankar Gupta", "left"),
      makeLine("Resident of 45, Civil Lines, Kanpur – 208001", "left"),
      makeLine("", "left"),
      makeLine(
        "SUBJECT: Notice in Contempt Petition No. 1234 of 2024",
        "left",
        { bold: true },
      ),
      makeLine("", "left"),
      makeLine(
        "Whereas a Contempt Petition has been filed before this Hon'ble Court by the petitioner alleging willful disobedience of the order dated 12th January, 2024 passed in Writ Petition No. 5678 of 2023;",
        "justify",
      ),
      makeLine("", "left"),
      makeLine(
        "You are hereby directed to appear in person before this Court on 25th May, 2024 at 10:30 A.M. to show cause why contempt proceedings should not be initiated against you for non-compliance of the aforesaid order.",
        "justify",
      ),
      makeLine("", "left"),
      makeLine(
        "Please note that failure to appear on the said date shall entitle the Court to proceed ex-parte and pass such orders as it may deem fit in the circumstances of the case.",
        "justify",
      ),
      makeLine("", "left"),
      makeLine(
        "This notice is issued under the orders of the Hon'ble Court.",
        "left",
      ),
      makeLine("", "left"),
      makeLine("Registrar (Judicial)", "right"),
      makeLine("Allahabad High Court, Prayagraj", "right"),
    ],
    plainText: "",
  },
  {
    id: 4,
    title: "Circular – Leave Policy",
    lines: [
      makeLine("ALLAHABAD HIGH COURT", "center", { bold: true }),
      makeLine("ADMINISTRATIVE CIRCULAR", "center", {
        bold: true,
        underline: true,
      }),
      makeLine("", "left"),
      makeLine("Circular No. AHC/CIRC/2024/017", "left"),
      makeLine("Date: 05th June, 2024", "right"),
      makeLine("", "left"),
      makeLine(
        "SUBJECT: Revised Guidelines for Grant of Casual Leave and Earned Leave",
        "left",
        { bold: true, underline: true },
      ),
      makeLine("", "left"),
      makeLine("To All Officers and Staff", "left"),
      makeLine("Allahabad High Court, Prayagraj", "left"),
      makeLine("", "left"),
      makeLine(
        "In continuation of this office Circular No. AHC/CIRC/2023/009 dated 12th August, 2023 and in view of the representations received from the Staff Association, the following revised guidelines are hereby issued with respect to grant of leave:",
        "justify",
      ),
      makeLine("", "left"),
      makeLine(
        "1. Casual Leave (CL): Maximum of 02 days of Casual Leave may be availed at a time. Application for CL shall be submitted at least 24 hours in advance except in cases of emergency.",
        "left",
      ),
      makeLine("", "left"),
      makeLine(
        "2. Earned Leave (EL): Earned Leave beyond 10 days requires prior sanction from the Registrar General. Medical certificate from a registered medical practitioner is mandatory for leave exceeding 03 consecutive days.",
        "left",
      ),
      makeLine("", "left"),
      makeLine(
        "3. Leave Without Pay (LWP): No employee shall proceed on Leave Without Pay without prior written sanction.",
        "left",
      ),
      makeLine("", "left"),
      makeLine(
        "All previous instructions inconsistent with these guidelines stand superseded. These guidelines shall come into force with immediate effect.",
        "justify",
      ),
      makeLine("", "left"),
      makeLine("By Order", "left"),
      makeLine("Registrar General", "right"),
      makeLine("Allahabad High Court, Prayagraj", "right"),
    ],
    plainText: "",
  },
  {
    id: 5,
    title: "Memo – Audit Compliance",
    lines: [
      makeLine("OFFICE MEMORANDUM", "center", { bold: true, underline: true }),
      makeLine("", "left"),
      makeLine("No. AHC/ACCTS/2024/0231", "left"),
      makeLine("Date: 18th July, 2024", "right"),
      makeLine("", "left"),
      makeLine("From:", "left", { bold: true }),
      makeLine("Deputy Registrar (Accounts)", "left"),
      makeLine("Allahabad High Court, Prayagraj", "left"),
      makeLine("", "left"),
      makeLine("To:", "left", { bold: true }),
      makeLine("All Drawing and Disbursing Officers", "left"),
      makeLine("Allahabad High Court, Prayagraj", "left"),
      makeLine("", "left"),
      makeLine(
        "SUBJECT: Compliance with Audit Observations of CAG Report 2023-24",
        "left",
        { bold: true, underline: true },
      ),
      makeLine("", "left"),
      makeLine(
        "Reference is invited to the Comptroller and Auditor General of India's Audit Report for the year 2023-24, wherein several observations have been raised with respect to financial irregularities in various branches of this Court.",
        "justify",
      ),
      makeLine("", "left"),
      makeLine(
        "2. All Drawing and Disbursing Officers are hereby directed to furnish their replies to the audit observations pertaining to their respective branches by 31st July, 2024, positively.",
        "justify",
      ),
      makeLine("", "left"),
      makeLine(
        "3. It is further directed that all pending Utilization Certificates for grants received during 2022-23 and 2023-24 shall be submitted to this office by 10th August, 2024.",
        "justify",
      ),
      makeLine("", "left"),
      makeLine(
        "4. Non-compliance shall be treated as a serious lapse and disciplinary proceedings shall be initiated accordingly.",
        "justify",
      ),
      makeLine("", "left"),
      makeLine("Deputy Registrar (Accounts)", "right"),
      makeLine("Allahabad High Court, Prayagraj", "right"),
    ],
    plainText: "",
  },
];

// Build plain text from formatted passage
for (const p of passages) {
  p.plainText = p.lines
    .map((l) => l.words.map((w) => w.text).join(" "))
    .filter(Boolean)
    .join("\n");
}

type TestState = "idle" | "running" | "finished";

interface MistakeBreakdown {
  spellingMistakes: number;
  leftOutWords: number;
  punctuationErrors: number;
  boldItalicErrors: number;
  justificationErrors: number;
  paragraphErrors: number;
  indentErrors: number;
  lineSpacingErrors: number;
  totalMistakes: number;
  marksDeducted: number;
  totalMarks: number;
  finalMarks: number;
}

interface WordResult {
  word: string;
  status: "correct" | "wrong" | "missing" | "extra";
  errorType?: string;
}

function isSpellingMistake(orig: string, typed: string): boolean {
  const clean = (s: string) => s.replace(/[.,!?;:"'()\-–]/g, "").toLowerCase();
  return (
    clean(orig) !== clean(typed) && orig.toLowerCase() !== typed.toLowerCase()
  );
}

function isPunctuationError(orig: string, typed: string): boolean {
  const stripPunct = (s: string) =>
    s.replace(/[.,!?;:"'()\-–]/g, "").toLowerCase();
  const addPunct = (s: string) => s.replace(/[^a-zA-Z0-9]/g, "");
  return (
    stripPunct(orig) === stripPunct(typed) && addPunct(orig) !== addPunct(typed)
  );
}

function computeResults(
  passage: FormattedPassage,
  typedText: string,
  typedAlignment: Alignment,
  typedBold: boolean,
  typedItalic: boolean,
  _typedUnderline: boolean,
  typedLineSpacing: number,
  typedIndent: boolean,
): { wordResults: WordResult[]; breakdown: MistakeBreakdown; wpm: number } {
  const origWords = passage.plainText.trim().split(/\s+/).filter(Boolean);
  const typedWords = typedText.trim().split(/\s+/).filter(Boolean);

  let spellingMistakes = 0;
  let leftOutWords = 0;
  let punctuationErrors = 0;
  let paragraphErrors = 0;
  const wordResults: WordResult[] = [];

  origWords.forEach((origWord, i) => {
    if (i >= typedWords.length) {
      leftOutWords++;
      wordResults.push({
        word: origWord,
        status: "missing",
        errorType: "Left-out",
      });
    } else {
      const typed = typedWords[i];
      if (typed.toLowerCase() === origWord.toLowerCase()) {
        wordResults.push({ word: origWord, status: "correct" });
      } else if (isPunctuationError(origWord, typed)) {
        punctuationErrors++;
        wordResults.push({
          word: typed,
          status: "wrong",
          errorType: "Punctuation",
        });
      } else if (isSpellingMistake(origWord, typed)) {
        spellingMistakes++;
        wordResults.push({
          word: typed,
          status: "wrong",
          errorType: "Spelling",
        });
      } else {
        paragraphErrors++;
        wordResults.push({
          word: typed,
          status: "wrong",
          errorType: "Phrasing",
        });
      }
    }
  });

  // Check formatting errors
  const hasExpectedBold = passage.lines.some((l) =>
    l.words.some((w) => w.bold),
  );
  const hasExpectedItalic = passage.lines.some((l) =>
    l.words.some((w) => w.italic),
  );

  let boldItalicErrors = 0;
  if (hasExpectedBold && !typedBold) boldItalicErrors++;
  if (hasExpectedItalic && !typedItalic) boldItalicErrors++;

  // Justification errors
  let justificationErrors = 0;
  const hasCenterLine = passage.lines.some(
    (l) => l.alignment === "center" && l.words.length > 0,
  );
  const hasRightLine = passage.lines.some(
    (l) => l.alignment === "right" && l.words.length > 0,
  );
  const hasJustifyLine = passage.lines.some(
    (l) => l.alignment === "justify" && l.words.length > 0,
  );

  if (hasCenterLine && typedAlignment !== "center") justificationErrors++;
  if (hasRightLine && typedAlignment !== "right") justificationErrors++;
  if (hasJustifyLine && typedAlignment !== "justify") justificationErrors++;

  // Indentation errors: passage with numbered paragraphs expects no indent; formal passages may expect indent
  // Simple rule: if passage has justify lines (formal body paragraphs), indent expected
  const indentErrors = hasJustifyLine && !typedIndent ? 1 : 0;

  // Line spacing errors: default expected is 1.15 for formal docs
  const expectedLineSpacing = 1.15;
  const lineSpacingErrors =
    Math.abs(typedLineSpacing - expectedLineSpacing) > 0.01 ? 1 : 0;

  const totalMistakes =
    spellingMistakes +
    leftOutWords +
    punctuationErrors +
    boldItalicErrors +
    justificationErrors +
    paragraphErrors +
    indentErrors +
    lineSpacingErrors;
  const marksDeducted = Number.parseFloat((totalMistakes * 0.1).toFixed(1));
  const totalMarks = 100;
  const finalMarks = Number.parseFloat(
    Math.max(0, totalMarks - marksDeducted).toFixed(1),
  );

  return {
    wordResults,
    breakdown: {
      spellingMistakes,
      leftOutWords,
      punctuationErrors,
      boldItalicErrors,
      justificationErrors,
      paragraphErrors,
      indentErrors,
      lineSpacingErrors,
      totalMistakes,
      marksDeducted,
      totalMarks,
      finalMarks,
    },
    wpm: 0,
  };
}

const PENALTY_PER_ERROR = 0.1;

export default function TypingTestPage({ navigateTo: _navigateTo }: Props) {
  const [selectedPassageId, setSelectedPassageId] = useState(1);
  const [timerMinutes, setTimerMinutes] = useState(15);
  const [testState, setTestState] = useState<TestState>("idle");
  const [timeLeft, setTimeLeft] = useState(900);
  const [typedText, setTypedText] = useState("");
  const [results, setResults] = useState<ReturnType<
    typeof computeResults
  > | null>(null);
  const [wpm, setWpm] = useState(0);

  // Formatting toolbar state
  const [typedBold, setTypedBold] = useState(false);
  const [typedItalic, setTypedItalic] = useState(false);
  const [typedUnderline, setTypedUnderline] = useState(false);
  const [typedAlignment, setTypedAlignment] = useState<Alignment>("left");

  // Paragraph formatting state
  const [typedLineSpacing, setTypedLineSpacing] = useState(1.15);
  const [typedParaSpacing, setTypedParaSpacing] = useState(0);
  const [typedIndent, setTypedIndent] = useState(false);

  // Custom passage state
  const [customPassageText, setCustomPassageText] = useState<string>(
    () => localStorage.getItem("custom-typing-passage") ?? "",
  );
  const [customPasteText, setCustomPasteText] = useState("");
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [usingCustom, setUsingCustom] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const passageFileRef = useRef<HTMLInputElement>(null);

  const builtInPassage =
    passages.find((p) => p.id === selectedPassageId) ?? passages[0];

  const passage: FormattedPassage =
    usingCustom && customPassageText
      ? {
          id: 99,
          title: "Custom Passage",
          lines: customPassageText
            .split("\n")
            .map((line) => makeLine(line, "left")),
          plainText: customPassageText,
        }
      : builtInPassage;

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const finishTest = useCallback(
    (text: string) => {
      stopTimer();
      const elapsed = (Date.now() - startTimeRef.current) / 60000;
      const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
      const calcWpm = elapsed > 0 ? Math.round(wordCount / elapsed) : 0;
      setWpm(calcWpm);
      const res = computeResults(
        passage,
        text,
        typedAlignment,
        typedBold,
        typedItalic,
        typedUnderline,
        typedLineSpacing,
        typedIndent,
      );
      res.wpm = calcWpm;
      setResults(res);
      setTestState("finished");
    },
    [
      stopTimer,
      passage,
      typedAlignment,
      typedBold,
      typedItalic,
      typedUnderline,
      typedLineSpacing,
      typedIndent,
    ],
  );

  useEffect(() => {
    if (testState === "running") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            finishTest(typedText);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => stopTimer();
  }, [testState, finishTest, stopTimer, typedText]);

  const startTest = () => {
    setTypedText("");
    setResults(null);
    setTimeLeft(timerMinutes * 60);
    startTimeRef.current = Date.now();
    setTestState("running");
    setTypedBold(false);
    setTypedItalic(false);
    setTypedUnderline(false);
    setTypedAlignment("left");
    setTypedLineSpacing(1.15);
    setTypedParaSpacing(0);
    setTypedIndent(false);
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const resetTest = () => {
    stopTimer();
    setTestState("idle");
    setTypedText("");
    setResults(null);
    setTimeLeft(timerMinutes * 60);
    setWpm(0);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handlePassageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setCustomPasteText(text);
    };
    reader.readAsText(file);
  };

  const applyCustomPassage = () => {
    const text = customPasteText || customPassageText;
    if (!text.trim()) return;
    localStorage.setItem("custom-typing-passage", text);
    setCustomPassageText(text);
    setUsingCustom(true);
    setShowUploadPanel(false);
    resetTest();
  };

  const clearCustomPassage = () => {
    setCustomPassageText("");
    setCustomPasteText("");
    setUsingCustom(false);
    localStorage.removeItem("custom-typing-passage");
    if (passageFileRef.current) passageFileRef.current.value = "";
  };

  const correctWords = results
    ? results.wordResults.filter((w) => w.status === "correct").length
    : 0;
  const totalWords = results
    ? results.wordResults.filter((w) => w.status !== "extra").length
    : 0;
  const accuracy =
    totalWords > 0 ? Math.round((correctWords / totalWords) * 100) : 0;
  const passResult = results && wpm >= 80 && accuracy >= 95;

  return (
    <div className="min-h-screen bg-section-band">
      {/* Header */}
      <div className="bg-navy text-white py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              HC PS Typing Test
            </h1>
            <p className="text-white/70 text-sm">
              Allahabad High Court – Personal Secretary Exam Simulation ·
              15-minute test · 500 words
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Scoring Criteria Box */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-l-4 border-l-teal bg-white shadow-card">
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-teal mt-0.5 shrink-0" />
                <p className="font-semibold text-navy text-sm">
                  Allahabad High Court PS Exam – Official Scoring Criteria
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                {[
                  { label: "Spelling Mistake", penalty: "0.100 marks" },
                  { label: "Left-out Word", penalty: "0.100 marks" },
                  { label: "Punctuation Error", penalty: "0.100 marks" },
                  { label: "Bold/Italic Error", penalty: "0.100 marks" },
                  { label: "Justification Error", penalty: "0.100 marks" },
                  { label: "Paragraph Phrasing", penalty: "0.100 marks" },
                  { label: "Indentation Error", penalty: "0.100 marks" },
                  { label: "Line/Para Spacing", penalty: "0.100 marks" },
                  { label: "Extra Words", penalty: "Ignored" },
                  { label: "Pass Criteria", penalty: "≥80 WPM + ≥95%" },
                ].map((item) => (
                  <div key={item.label} className="bg-slate-50 rounded p-2">
                    <div className="font-medium text-navy">{item.label}</div>
                    <div className="text-teal font-bold">{item.penalty}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Custom Passage Upload */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <Card className="bg-white shadow-card border-l-4 border-l-amber-500">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-navy flex items-center gap-2">
                  <Upload className="w-4 h-4 text-amber-500" />
                  अपना Passage Upload करें (.txt)
                  {usingCustom && (
                    <Badge className="bg-amber-100 text-amber-800 text-xs ml-2">
                      Custom Active
                    </Badge>
                  )}
                </CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowUploadPanel(!showUploadPanel)}
                  className="text-navy"
                >
                  {showUploadPanel ? "Hide" : "Open"}
                </Button>
              </div>
            </CardHeader>
            {showUploadPanel && (
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    ref={passageFileRef}
                    type="file"
                    accept=".txt"
                    onChange={handlePassageFileUpload}
                    className="hidden"
                    id="passage-file-input"
                  />
                  <label
                    htmlFor="passage-file-input"
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    File Choose करें
                  </label>
                  <span className="text-xs text-muted-foreground">
                    या नीचे paste करें
                  </span>
                </div>
                <Textarea
                  value={customPasteText}
                  onChange={(e) => setCustomPasteText(e.target.value)}
                  placeholder="यहाँ अपना formatted passage paste करें..."
                  className="min-h-40 font-mono text-sm resize-none"
                />
                <div className="flex gap-3">
                  <Button
                    className="bg-amber-500 hover:bg-amber-600 text-white border-0"
                    onClick={applyCustomPassage}
                    disabled={
                      !customPasteText.trim() && !customPassageText.trim()
                    }
                  >
                    Custom Passage Apply करें
                  </Button>
                  {usingCustom && (
                    <Button
                      variant="outline"
                      onClick={clearCustomPassage}
                      className="border-navy text-navy"
                    >
                      Remove Custom
                    </Button>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        </motion.div>

        {/* Controls */}
        {testState !== "running" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-4 items-end"
          >
            {!usingCustom && (
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-navy uppercase tracking-wide">
                  Select Passage
                </span>
                <Select
                  value={String(selectedPassageId)}
                  onValueChange={(v) => {
                    setSelectedPassageId(Number(v));
                    resetTest();
                  }}
                >
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {passages.map((p) => (
                      <SelectItem key={p.id} value={String(p.id)}>
                        {p.id}. {p.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-navy uppercase tracking-wide">
                Test Duration
              </span>
              <Select
                value={String(timerMinutes)}
                onValueChange={(v) => {
                  setTimerMinutes(Number(v));
                  setTimeLeft(Number(v) * 60);
                }}
              >
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 7, 10, 15, 20].map((m) => (
                    <SelectItem key={m} value={String(m)}>
                      {m} Minutes
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {testState === "idle" && (
              <Button
                className="bg-teal hover:bg-teal-dark text-white border-0 h-10"
                onClick={startTest}
              >
                Start Test
              </Button>
            )}
            {testState === "finished" && (
              <Button
                variant="outline"
                className="border-navy text-navy h-10"
                onClick={resetTest}
              >
                <RotateCcw className="w-4 h-4 mr-2" /> Try Again
              </Button>
            )}
          </motion.div>
        )}

        {/* Main typing panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Passage Display */}
          <Card className="shadow-card bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2 text-navy">
                <FileText className="w-4 h-4" />
                {passage.title} – Reference Copy
                {usingCustom && (
                  <Badge className="bg-amber-100 text-amber-800 text-xs">
                    Custom
                  </Badge>
                )}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Formatting markers: <span className="font-bold">B</span> = Bold,{" "}
                <span className="italic">I</span> = Italic,{" "}
                <span className="underline">U</span> = Underline, C = Center, R
                = Right, J = Justify
              </p>
            </CardHeader>
            <CardContent>
              <div className="bg-white border rounded-md p-4 max-h-96 overflow-y-auto font-mono text-sm leading-relaxed">
                {passage.lines.map((line, li) => (
                  <div
                    key={`line-${line.alignment}-${li}`}
                    className={`min-h-[1.5rem] ${
                      line.alignment === "center"
                        ? "text-center"
                        : line.alignment === "right"
                          ? "text-right"
                          : line.alignment === "justify"
                            ? "text-justify"
                            : "text-left"
                    }`}
                  >
                    {line.words.length === 0 ? (
                      <span>&nbsp;</span>
                    ) : (
                      line.words.map((word, wi) => (
                        <span
                          key={`word-${li}-${word.text}-${wi}`}
                          className={`${word.bold ? "font-bold" : ""} ${
                            word.italic ? "italic" : ""
                          } ${word.underline ? "underline" : ""}`}
                        >
                          {word.text}
                          {wi < line.words.length - 1 ? " " : ""}
                        </span>
                      ))
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Typing Area */}
          <Card className="shadow-card bg-white">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-navy">Type Here</CardTitle>
                {testState === "running" && (
                  <div
                    className={`flex items-center gap-1 font-mono font-bold text-lg ${
                      timeLeft <= 60 ? "text-red-600" : "text-teal"
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    {formatTime(timeLeft)}
                  </div>
                )}
                {testState === "idle" && (
                  <div className="flex items-center gap-1 font-mono text-muted-foreground text-sm">
                    <Clock className="w-4 h-4" />
                    {formatTime(timerMinutes * 60)}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Formatting Toolbar */}
              <div className="flex items-center gap-1 flex-wrap p-2 bg-slate-50 rounded-md border">
                {/* Text Formatting */}
                <span className="text-xs text-muted-foreground mr-1">
                  Text:
                </span>
                <button
                  type="button"
                  onClick={() => setTypedBold((b) => !b)}
                  disabled={testState !== "running"}
                  className={`p-1.5 rounded text-sm font-bold border transition-colors ${
                    typedBold
                      ? "bg-navy text-white border-navy"
                      : "bg-white text-navy border-gray-300 hover:bg-slate-100"
                  } disabled:opacity-40`}
                  title="Bold (Ctrl+B)"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setTypedItalic((i) => !i)}
                  disabled={testState !== "running"}
                  className={`p-1.5 rounded border transition-colors ${
                    typedItalic
                      ? "bg-navy text-white border-navy"
                      : "bg-white text-navy border-gray-300 hover:bg-slate-100"
                  } disabled:opacity-40`}
                  title="Italic (Ctrl+I)"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setTypedUnderline((u) => !u)}
                  disabled={testState !== "running"}
                  className={`p-1.5 rounded border transition-colors ${
                    typedUnderline
                      ? "bg-navy text-white border-navy"
                      : "bg-white text-navy border-gray-300 hover:bg-slate-100"
                  } disabled:opacity-40`}
                  title="Underline (Ctrl+U)"
                >
                  <Underline className="w-4 h-4" />
                </button>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                {/* Alignment */}
                {[
                  {
                    align: "left" as Alignment,
                    icon: <AlignLeft className="w-4 h-4" />,
                    label: "Left",
                  },
                  {
                    align: "center" as Alignment,
                    icon: <AlignCenter className="w-4 h-4" />,
                    label: "Center",
                  },
                  {
                    align: "right" as Alignment,
                    icon: <AlignRight className="w-4 h-4" />,
                    label: "Right",
                  },
                  {
                    align: "justify" as Alignment,
                    icon: <AlignJustify className="w-4 h-4" />,
                    label: "Justify",
                  },
                ].map(({ align, icon, label }) => (
                  <button
                    type="button"
                    key={align}
                    onClick={() => setTypedAlignment(align)}
                    disabled={testState !== "running"}
                    className={`p-1.5 rounded border transition-colors ${
                      typedAlignment === align
                        ? "bg-navy text-white border-navy"
                        : "bg-white text-navy border-gray-300 hover:bg-slate-100"
                    } disabled:opacity-40`}
                    title={label}
                  >
                    {icon}
                  </button>
                ))}

                {/* Paragraph Formatting Divider */}
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <span className="text-xs text-muted-foreground mr-1">
                  Para:
                </span>

                {/* Line Spacing */}
                <div className="flex flex-col items-start">
                  <Select
                    value={String(typedLineSpacing)}
                    onValueChange={(v) => setTypedLineSpacing(Number(v))}
                    disabled={testState !== "running"}
                  >
                    <SelectTrigger
                      className="h-7 w-20 text-xs px-2 py-0 border-gray-300"
                      title="Line Spacing"
                    >
                      <SelectValue placeholder="Line" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1.0, 1.15, 1.5, 2.0].map((v) => (
                        <SelectItem
                          key={v}
                          value={String(v)}
                          className="text-xs"
                        >
                          {v}× Line
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Para Spacing */}
                <div className="flex flex-col items-start">
                  <Select
                    value={String(typedParaSpacing)}
                    onValueChange={(v) => setTypedParaSpacing(Number(v))}
                    disabled={testState !== "running"}
                  >
                    <SelectTrigger
                      className="h-7 w-20 text-xs px-2 py-0 border-gray-300"
                      title="Paragraph Spacing"
                    >
                      <SelectValue placeholder="Para" />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 6, 12, 18].map((v) => (
                        <SelectItem
                          key={v}
                          value={String(v)}
                          className="text-xs"
                        >
                          {v}px Para
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Indent Toggle */}
                <button
                  type="button"
                  onClick={() => setTypedIndent((i) => !i)}
                  disabled={testState !== "running"}
                  className={`px-2 py-1 rounded border text-xs font-medium transition-colors ${
                    typedIndent
                      ? "bg-navy text-white border-navy"
                      : "bg-white text-navy border-gray-300 hover:bg-slate-100"
                  } disabled:opacity-40`}
                  title="First-line Indent"
                >
                  Indent
                </button>
              </div>

              <div
                className={`${
                  typedAlignment === "center"
                    ? "text-center"
                    : typedAlignment === "right"
                      ? "text-right"
                      : typedAlignment === "justify"
                        ? "text-justify"
                        : "text-left"
                }`}
                style={{
                  marginBottom: typedParaSpacing
                    ? `${typedParaSpacing}px`
                    : undefined,
                }}
              >
                <Textarea
                  ref={textareaRef}
                  value={typedText}
                  onChange={(e) => setTypedText(e.target.value)}
                  disabled={testState !== "running"}
                  placeholder={
                    testState === "idle"
                      ? "Click 'Start Test' to begin..."
                      : testState === "finished"
                        ? "Test completed."
                        : "Start typing the passage..."
                  }
                  style={{
                    lineHeight: typedLineSpacing,
                    textIndent: typedIndent ? "2rem" : "0",
                  }}
                  className={`min-h-60 text-sm resize-none ${
                    typedBold ? "font-bold" : "font-normal"
                  } ${typedItalic ? "italic" : ""} ${
                    typedUnderline ? "underline" : ""
                  } ${
                    typedAlignment === "center"
                      ? "text-center"
                      : typedAlignment === "right"
                        ? "text-right"
                        : typedAlignment === "justify"
                          ? "text-justify"
                          : "text-left"
                  }`}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Words typed:{" "}
                  {typedText.trim().split(/\s+/).filter(Boolean).length}
                </span>
                {testState === "running" && (
                  <Button
                    size="sm"
                    className="bg-navy hover:bg-navy-dark text-white border-0"
                    onClick={() => finishTest(typedText)}
                  >
                    Submit
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <AnimatePresence>
          {results && testState === "finished" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="shadow-card bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <CardTitle className="text-navy">Your Result</CardTitle>
                    <Badge
                      className={`text-base px-4 py-1 ${
                        passResult
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100"
                      }`}
                    >
                      {passResult ? (
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                      ) : (
                        <XCircle className="w-4 h-4 mr-1" />
                      )}
                      {passResult ? "PASS" : "FAIL"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Score summary */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "WPM (Speed)", value: wpm, pass: wpm >= 80 },
                      {
                        label: "Accuracy",
                        value: `${accuracy}%`,
                        pass: accuracy >= 95,
                      },
                      {
                        label: "Total Mistakes",
                        value: results.breakdown.totalMistakes,
                        pass: results.breakdown.totalMistakes === 0,
                      },
                      {
                        label: "Marks Deducted",
                        value: `${results.breakdown.marksDeducted.toFixed(1)}`,
                        pass: results.breakdown.marksDeducted === 0,
                      },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className={`rounded-lg p-4 text-center ${
                          stat.pass
                            ? "bg-green-50 border border-green-200"
                            : "bg-red-50 border border-red-200"
                        }`}
                      >
                        <div className="text-2xl font-bold text-navy">
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mistake Breakdown Table */}
                  <div>
                    <h3 className="font-semibold text-navy mb-3 text-sm">
                      Mistake Breakdown (Official Criteria)
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-navy text-white">
                            <th className="text-left p-2 rounded-tl">
                              Mistake Type
                            </th>
                            <th className="text-center p-2">Count</th>
                            <th className="text-center p-2">Per Error</th>
                            <th className="text-center p-2 rounded-tr">
                              Marks Deducted
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            {
                              type: "Spelling Mistakes",
                              count: results.breakdown.spellingMistakes,
                            },
                            {
                              type: "Left-out Words",
                              count: results.breakdown.leftOutWords,
                            },
                            {
                              type: "Punctuation Errors",
                              count: results.breakdown.punctuationErrors,
                            },
                            {
                              type: "Bold/Italic Formatting",
                              count: results.breakdown.boldItalicErrors,
                            },
                            {
                              type: "Justification (L/R/C/J)",
                              count: results.breakdown.justificationErrors,
                            },
                            {
                              type: "Paragraph Phrasing",
                              count: results.breakdown.paragraphErrors,
                            },
                            {
                              type: "Indentation Error",
                              count: results.breakdown.indentErrors,
                            },
                            {
                              type: "Line/Para Spacing",
                              count: results.breakdown.lineSpacingErrors,
                            },
                            { type: "Extra Words", count: 0, ignored: true },
                          ].map((row, i) => (
                            <tr
                              key={row.type}
                              className={
                                i % 2 === 0 ? "bg-slate-50" : "bg-white"
                              }
                            >
                              <td className="p-2 text-navy">{row.type}</td>
                              <td className="p-2 text-center font-bold">
                                {row.count ?? 0}
                              </td>
                              <td className="p-2 text-center text-muted-foreground">
                                {(row as { ignored?: boolean }).ignored
                                  ? "Ignored"
                                  : `${PENALTY_PER_ERROR} marks`}
                              </td>
                              <td className="p-2 text-center font-bold text-red-600">
                                {(row as { ignored?: boolean }).ignored
                                  ? "-"
                                  : `${((row.count ?? 0) * PENALTY_PER_ERROR).toFixed(1)}`}
                              </td>
                            </tr>
                          ))}
                          <tr className="bg-navy text-white font-bold">
                            <td className="p-2 rounded-bl">TOTAL</td>
                            <td className="p-2 text-center">
                              {results.breakdown.totalMistakes}
                            </td>
                            <td className="p-2" />
                            <td className="p-2 text-center rounded-br">
                              {results.breakdown.marksDeducted.toFixed(1)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Final Score */}
                  <div className="flex items-center justify-between bg-slate-50 rounded-lg p-4 border">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Marks
                      </p>
                      <p className="text-lg font-bold text-navy">100.0</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Marks Deducted
                      </p>
                      <p className="text-lg font-bold text-red-600">
                        – {results.breakdown.marksDeducted.toFixed(1)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        Final Score
                      </p>
                      <p
                        className={`text-2xl font-bold ${
                          results.breakdown.finalMarks >= 95
                            ? "text-green-600"
                            : "text-orange-600"
                        }`}
                      >
                        {results.breakdown.finalMarks.toFixed(1)}
                      </p>
                    </div>
                  </div>

                  {/* Feedback */}
                  <div
                    className={`rounded-lg p-4 text-sm ${
                      passResult
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-orange-50 text-orange-800 border border-orange-200"
                    }`}
                  >
                    {passResult
                      ? "🎉 Excellent! You have met the Allahabad HC PS exam criteria. Keep practicing!"
                      : wpm < 80 && accuracy < 95
                        ? "💪 Both speed and accuracy need improvement. Practice daily passages."
                        : wpm < 80
                          ? "⚡ Good accuracy! Focus on increasing typing speed to 80+ WPM."
                          : "🎯 Great speed! Reduce errors – watch formatting (Bold/Align/Indent/Spacing) carefully."}
                  </div>

                  {/* Word Analysis */}
                  <div>
                    <h3 className="font-semibold text-navy mb-3 text-sm">
                      Word-by-Word Analysis
                    </h3>
                    <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-2 bg-section-band rounded-lg">
                      {results.wordResults.map((item, i) => (
                        <span
                          key={`result-${item.word}-${i}`}
                          title={item.errorType}
                          className={`px-2 py-0.5 rounded text-xs font-medium ${
                            item.status === "correct"
                              ? "bg-green-100 text-green-800"
                              : item.status === "missing"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.word}
                          {item.errorType && (
                            <span className="ml-1 opacity-60 text-[10px]">
                              ({item.errorType})
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded bg-green-100 inline-block" />{" "}
                        Correct
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded bg-red-100 inline-block" />{" "}
                        Wrong
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded bg-orange-100 inline-block" />{" "}
                        Missing
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={resetTest}
                    className="border-navy text-navy"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" /> Try Again
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
