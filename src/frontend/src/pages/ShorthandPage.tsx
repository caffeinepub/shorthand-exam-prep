import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Headphones,
  RotateCcw,
  Square,
  Upload,
  Volume2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Page } from "../App";

interface Props {
  navigateTo: (page: Page) => void;
}

type Difficulty = "Beginner" | "Intermediate" | "Advanced";
type TestState = "idle" | "running" | "finished";

interface Passage {
  id: number;
  title: string;
  category: string;
  words: number;
  difficulty: Difficulty;
  content: string;
}

const passages: Passage[] = [
  {
    id: 1,
    title: "Office Memorandum",
    category: "Administration",
    words: 120,
    difficulty: "Beginner",
    content:
      "This is to inform all members of the staff that the office will remain closed on Monday, the 15th of April, on account of a public holiday. All pending work shall be completed by Friday, the 12th of April. Employees who have any urgent assignments must submit their reports to the section officer before they proceed on leave. Any employee wishing to avail compensatory leave in lieu of the holiday should apply in writing to the establishment branch. The administration requests full cooperation from all departments to ensure smooth functioning of the office during this period. Any queries may be directed to the Administrative Officer.",
  },
  {
    id: 2,
    title: "Legal Notice",
    category: "Legal",
    words: 140,
    difficulty: "Intermediate",
    content:
      "Take notice that my client, Mr. Suresh Prasad, resident of 12, Gandhi Nagar, Allahabad, has instructed me to serve upon you this legal notice. It has come to the notice of my client that you have been unlawfully occupying the premises situated at Plot Number 45, Civil Lines, Prayagraj, which is the lawful property of my client. My client has repeatedly requested you to vacate the said premises, but you have failed to comply. You are hereby called upon to vacate the said premises within fifteen days from the date of receipt of this notice, failing which my client shall be constrained to initiate appropriate legal proceedings against you before the competent court of law without any further notice.",
  },
  {
    id: 3,
    title: "Court Order",
    category: "Judicial",
    words: 130,
    difficulty: "Advanced",
    content:
      "This matter came up before the Court today for hearing on the application filed by the petitioner seeking interim relief. After hearing the learned counsel for the petitioner and perusing the material on record, the Court is of the considered opinion that a prima facie case has been made out by the petitioner. The balance of convenience lies in favour of the petitioner and irreparable harm shall be caused if the relief is not granted at this stage. Accordingly, it is ordered that the respondents are restrained from dispossessing the petitioner from the subject property until the next date of hearing. The respondents are directed to file their counter affidavit within four weeks. The matter is listed for further hearing on the date to be notified by the registry.",
  },
  {
    id: 4,
    title: "Government Circular",
    category: "Administration",
    words: 125,
    difficulty: "Beginner",
    content:
      "The Government of Uttar Pradesh, General Administration Department, hereby issues the following circular for the information and compliance of all government servants. It has been decided by the competent authority that henceforth all official correspondence shall be conducted only through official email accounts provided by the National Informatics Centre. Personal email accounts shall not be used for official communication under any circumstances. All officers and staff are directed to create their official email accounts immediately if they have not already done so. The respective departmental heads shall ensure compliance within fifteen days. A compliance report shall be submitted to this department by the end of the current month without fail.",
  },
  {
    id: 5,
    title: "Appointment Letter",
    category: "HR",
    words: 150,
    difficulty: "Intermediate",
    content:
      "With reference to your application and subsequent interview held on the fifth of March, we are pleased to inform you that you have been selected for the post of Personal Assistant in the scale of pay of Level Seven of the Pay Matrix. Your appointment is subject to the following terms and conditions. You are required to report to the Administrative Officer of this department on the date specified in the joining order. You will be on probation for a period of two years from the date of joining. Your appointment is subject to verification of all original documents including educational certificates, caste certificate, and character certificates from the concerned authorities. You are expected to maintain the highest standards of integrity and discipline during your tenure of service.",
  },
  {
    id: 6,
    title: "Affidavit",
    category: "Legal",
    words: 135,
    difficulty: "Advanced",
    content:
      "I, Ram Nath Sharma, son of Shyam Nath Sharma, resident of 78, Tagore Town, Prayagraj, do hereby solemnly affirm and declare as under. That I am the deponent in the above-captioned matter and am fully conversant with the facts of the case. That the facts stated in the accompanying petition are true and correct to the best of my knowledge and belief and nothing material has been concealed therefrom. That I have not filed any other petition or application in any other Court or Forum seeking similar relief on the subject matter of the present petition. That I undertake to bring to the notice of this Honourable Court any event or change of circumstances which may have a bearing on the present proceedings. The deponent states that this affidavit is being filed in support of the petition.",
  },
  {
    id: 7,
    title: "Minutes of Meeting",
    category: "Administration",
    words: 145,
    difficulty: "Intermediate",
    content:
      "The meeting of the Finance Committee was held on Monday, the eighteenth of March, under the chairmanship of the Principal Secretary, Finance Department. The following members were present: Joint Secretary Finance, Deputy Secretary Administration, Senior Accounts Officer, and Section Officer Establishment. The minutes of the previous meeting were confirmed and signed by the Chairman. The committee reviewed the revised budget estimates for the current financial year and noted that expenditure under certain heads had exceeded the allocated amounts. The Committee directed all drawing and disbursing officers to exercise strict financial discipline and avoid any excess expenditure without prior sanction. The next meeting of the Finance Committee shall be held on the fifteenth of April at eleven o'clock in the morning in the conference room of the Finance Department.",
  },
  {
    id: 8,
    title: "Public Notice",
    category: "Legal",
    words: 115,
    difficulty: "Beginner",
    content:
      "Public Notice is hereby given to all persons concerned that an application has been made to the District Magistrate, Prayagraj, for the renewal of licence for the storage of petroleum products at the premises situated at Industrial Area, Naini, Prayagraj. Any person having any objection to the grant or renewal of the said licence may submit their written objection to the office of the District Magistrate within fifteen days from the date of publication of this notice. Objections received after the stipulated period shall not be entertained. This notice is issued in pursuance of the provisions of the Petroleum Act and Rules made thereunder. For further details, contact the Petroleum Section of the District Collectorate during office hours.",
  },
  {
    id: 9,
    title: "Service Certificate",
    category: "HR",
    words: 110,
    difficulty: "Beginner",
    content:
      "This is to certify that Shri Vijay Kumar Pandey, son of Shri Mohan Lal Pandey, has been working in this organization as a Senior Clerk since the first of January two thousand and fifteen. He has been a regular employee of this organization and his service record is found to be satisfactory. His conduct and character have been good throughout his period of service. He bears a good reputation among his colleagues and superiors. This certificate is being issued at his request for submission to the concerned authorities. The organization wishes him success in his future endeavours. This certificate is valid for a period of six months from the date of issue.",
  },
  {
    id: 10,
    title: "Tender Notice",
    category: "Administration",
    words: 140,
    difficulty: "Intermediate",
    content:
      "Sealed tenders are invited from eligible and experienced contractors for the construction of a boundary wall and entry gate at the premises of the District Court, Lucknow. The estimated cost of the work is rupees twenty-five lakhs. The tender documents can be obtained from the office of the Executive Engineer, Public Works Department, on payment of a non-refundable fee of five hundred rupees during office hours. The last date for submission of tenders is the thirtieth of April. Tenders shall be opened on the first of May in the presence of the tenderers or their authorised representatives. The competent authority reserves the right to reject any or all tenders without assigning any reason. For further details and specifications, please contact the office of the Executive Engineer, Civil Division.",
  },
  {
    id: 11,
    title: "Writ Petition Summary",
    category: "Judicial",
    words: 155,
    difficulty: "Advanced",
    content:
      "The petitioner has approached this Honourable Court by way of the present writ petition filed under Article 226 of the Constitution of India, challenging the order dated the twelfth of February passed by the respondent authority refusing to grant permission for the establishment of a private school in Varanasi district. The petitioner contends that the impugned order is arbitrary, illegal, and violative of the fundamental rights guaranteed under Articles 14 and 19 of the Constitution. It is submitted that the petitioner has fulfilled all the eligibility criteria prescribed under the Right to Education Act and the rules framed thereunder. The refusal to grant permission without any cogent reason is discriminatory and amounts to an unreasonable restriction on the right to carry on any occupation, trade, or business. The petitioner prays that the impugned order be quashed and the respondent be directed to grant the requisite permission forthwith.",
  },
  {
    id: 12,
    title: "Property Transfer Deed",
    category: "Legal",
    words: 160,
    difficulty: "Advanced",
    content:
      "This Deed of Transfer is executed on the tenth day of May in the year two thousand and twenty-four between Smt. Kamla Devi, widow of late Shri Hari Prasad, residing at 23, Allenganj, Prayagraj, hereinafter referred to as the Transferor, and Shri Anand Kumar Sinha, son of Shri Ram Prasad Sinha, residing at 56, George Town, Prayagraj, hereinafter referred to as the Transferee. Whereas the Transferor is the absolute owner of the immovable property situated at 34, Stanley Road, Prayagraj, more fully described in the Schedule attached hereto. And whereas the Transferor has agreed to transfer the said property to the Transferee for a consideration of rupees fifty lakhs only. Now this deed witnesseth that in consideration of the aforesaid amount duly received by the Transferor from the Transferee, the Transferor hereby transfers to the Transferee all her rights, title, and interest in the said property.",
  },
];

const CUSTOM_PASSAGE_ID = 99;

const wpmRates: Record<string, number> = {
  "80 WPM": 0.7,
  "100 WPM": 0.9,
  "120 WPM": 1.1,
};

const timeDurations: Record<string, number> = {
  "5 min": 300,
  "7 min": 420,
  "10 min": 600,
  "15 min": 900,
};

function computeResults(original: string, typed: string) {
  const origWords = original.trim().split(/\s+/).filter(Boolean);
  const typedWords = typed.trim().split(/\s+/).filter(Boolean);
  let correct = 0;
  const comparison: {
    word: string;
    status: "correct" | "wrong" | "missing";
  }[] = [];

  origWords.forEach((word, i) => {
    if (i < typedWords.length) {
      if (typedWords[i].toLowerCase() === word.toLowerCase()) {
        correct++;
        comparison.push({ word, status: "correct" });
      } else {
        comparison.push({ word: typedWords[i], status: "wrong" });
      }
    } else {
      comparison.push({ word, status: "missing" });
    }
  });

  const totalOrigWords = origWords.length;
  const accuracy =
    totalOrigWords > 0 ? Math.round((correct / totalOrigWords) * 100) : 0;
  return { comparison, correct, total: totalOrigWords, accuracy };
}

export default function ShorthandPage({ navigateTo: _navigateTo }: Props) {
  const [selectedPassage, setSelectedPassage] = useState<Passage | null>(null);
  const [selectedSpeed, setSelectedSpeed] = useState("100 WPM");
  const [selectedDuration, setSelectedDuration] = useState("10 min");
  const [testState, setTestState] = useState<TestState>("idle");
  const [timeLeft, setTimeLeft] = useState(600);
  const [typedText, setTypedText] = useState("");
  const [results, setResults] = useState<ReturnType<
    typeof computeResults
  > | null>(null);
  const [wpm, setWpm] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Custom dictation upload state
  const [customDictationText, setCustomDictationText] = useState<string>(
    () => localStorage.getItem("custom-dictation-text") ?? "",
  );
  const [showCustomPanel, setShowCustomPanel] = useState(false);
  const [customPasteText, setCustomPasteText] = useState("");

  // Audio upload state
  const [uploadedAudioUrl, setUploadedAudioUrl] = useState<string | null>(null);
  const [uploadedAudioName, setUploadedAudioName] = useState<string | null>(
    null,
  );

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const audioFileRef = useRef<HTMLInputElement>(null);
  const dictationFileRef = useRef<HTMLInputElement>(null);
  const audioElementRef = useRef<HTMLAudioElement>(null);

  // Cleanup audio object URLs on unmount
  useEffect(() => {
    return () => {
      if (uploadedAudioUrl) URL.revokeObjectURL(uploadedAudioUrl);
    };
  }, [uploadedAudioUrl]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stopAudio = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    return () => {
      stopAudio();
      stopTimer();
    };
  }, [stopAudio, stopTimer]);

  const finishTest = useCallback(
    (text: string) => {
      stopTimer();
      const elapsed = (Date.now() - startTimeRef.current) / 60000;
      const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
      const calcWpm = elapsed > 0 ? Math.round(wordCount / elapsed) : 0;
      setWpm(calcWpm);
      if (selectedPassage) {
        setResults(computeResults(selectedPassage.content, text));
      }
      setTestState("finished");
    },
    [stopTimer, selectedPassage],
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

  const playAudio = () => {
    if (!selectedPassage) return;
    // If uploaded audio, use audio element
    if (uploadedAudioUrl && audioElementRef.current) {
      audioElementRef.current.play();
      return;
    }
    stopAudio();
    const utterance = new SpeechSynthesisUtterance(selectedPassage.content);
    utterance.rate = wpmRates[selectedSpeed] ?? 0.9;
    utterance.onend = () => setIsPlaying(false);
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const startDictation = () => {
    const duration = timeDurations[selectedDuration] ?? 600;
    setTypedText("");
    setResults(null);
    setTimeLeft(duration);
    startTimeRef.current = Date.now();
    setTestState("running");
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const resetPractice = () => {
    stopTimer();
    stopAudio();
    setTestState("idle");
    setTypedText("");
    setResults(null);
    setWpm(0);
    const duration = timeDurations[selectedDuration] ?? 600;
    setTimeLeft(duration);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (uploadedAudioUrl) URL.revokeObjectURL(uploadedAudioUrl);
    const url = URL.createObjectURL(file);
    setUploadedAudioUrl(url);
    setUploadedAudioName(file.name);
  };

  const removeUploadedAudio = () => {
    if (uploadedAudioUrl) URL.revokeObjectURL(uploadedAudioUrl);
    setUploadedAudioUrl(null);
    setUploadedAudioName(null);
    if (audioFileRef.current) audioFileRef.current.value = "";
  };

  const handleDictationFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setCustomDictationText(text);
      setCustomPasteText(text);
      localStorage.setItem("custom-dictation-text", text);
    };
    reader.readAsText(file);
  };

  const applyCustomDictation = () => {
    const text = customPasteText || customDictationText;
    if (!text.trim()) return;
    const saved = text;
    localStorage.setItem("custom-dictation-text", saved);
    setCustomDictationText(saved);
    const words = saved.trim().split(/\s+/).filter(Boolean).length;
    const customPassage: Passage = {
      id: CUSTOM_PASSAGE_ID,
      title: "Custom Dictation",
      category: "Custom",
      words,
      difficulty: "Intermediate",
      content: saved,
    };
    setSelectedPassage(customPassage);
    setShowCustomPanel(false);
    resetPractice();
  };

  const difficultyColor: Record<Difficulty, string> = {
    Beginner: "bg-emerald-100 text-emerald-800",
    Intermediate: "bg-blue-100 text-blue-800",
    Advanced: "bg-violet-100 text-violet-800",
  };

  // Passage list view
  if (!selectedPassage) {
    return (
      <div className="min-h-screen bg-section-band">
        <div className="bg-navy text-white py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Shorthand Dictation Practice
              </h1>
              <p className="text-white/70 text-sm">
                Select a passage, listen to dictation, then type your
                transcription
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
          {/* Custom Dictation Upload Panel */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-white shadow-card border-l-4 border-l-teal">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-navy flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    अपना Custom Dictation Upload करें
                  </CardTitle>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowCustomPanel(!showCustomPanel)}
                    className="text-navy"
                    data-ocid="shorthand.open_modal_button"
                  >
                    {showCustomPanel ? "Hide" : "Open"}
                  </Button>
                </div>
              </CardHeader>
              {showCustomPanel && (
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-navy">
                      Upload .txt File
                    </span>
                    <div className="flex items-center gap-3">
                      <input
                        ref={dictationFileRef}
                        type="file"
                        accept=".txt"
                        onChange={handleDictationFileUpload}
                        className="hidden"
                        id="dictation-file-input"
                        data-ocid="shorthand.upload_button"
                      />
                      <label
                        htmlFor="dictation-file-input"
                        className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md bg-teal text-white text-sm font-medium hover:bg-teal-dark transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        .txt File Choose करें
                      </label>
                      <span className="text-xs text-muted-foreground">
                        या नीचे paste करें
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-navy">
                      Dictation Text Paste करें
                    </span>
                    <Textarea
                      value={customPasteText}
                      onChange={(e) => setCustomPasteText(e.target.value)}
                      placeholder="यहाँ अपना dictation text paste करें..."
                      className="min-h-32 font-mono text-sm resize-none"
                      data-ocid="shorthand.editor"
                    />
                  </div>
                  {customDictationText && !customPasteText && (
                    <p className="text-xs text-teal font-medium">
                      ✓ पिछला saved text available है — Apply करने के लिए नीचे क्लिक
                      करें
                    </p>
                  )}
                  <div className="flex gap-3">
                    <Button
                      className="bg-teal hover:bg-teal-dark text-white border-0"
                      onClick={applyCustomDictation}
                      disabled={
                        !customPasteText.trim() && !customDictationText.trim()
                      }
                      data-ocid="shorthand.primary_button"
                    >
                      Custom Passage Use करें
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCustomPasteText("");
                        setCustomDictationText("");
                        localStorage.removeItem("custom-dictation-text");
                        if (dictationFileRef.current)
                          dictationFileRef.current.value = "";
                      }}
                      className="border-navy text-navy"
                      data-ocid="shorthand.delete_button"
                    >
                      Clear
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {passages.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                data-ocid={`shorthand.item.${p.id}`}
              >
                <Card
                  className="cursor-pointer hover:shadow-card-hover transition-all bg-white shadow-card group"
                  onClick={() => {
                    setSelectedPassage(p);
                    resetPractice();
                  }}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl font-bold text-teal/30 leading-none">
                        {String(p.id).padStart(2, "0")}
                      </span>
                      <Badge
                        className={`text-xs font-medium ${
                          difficultyColor[p.difficulty]
                        }`}
                      >
                        {p.difficulty}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-navy text-base mb-1 group-hover:text-teal transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {p.category}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Volume2 className="w-3 h-3" />~{p.words} words
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Practice panel
  return (
    <div className="min-h-screen bg-section-band">
      <div className="bg-navy text-white py-6 px-6">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <button
            type="button"
            className="text-white/70 hover:text-white transition-colors"
            onClick={() => {
              resetPractice();
              setSelectedPassage(null);
            }}
            data-ocid="shorthand.secondary_button"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold">{selectedPassage.title}</h1>
            <p className="text-white/60 text-xs">
              {selectedPassage.category} · {selectedPassage.words} words ·{" "}
              <span
                className={`font-medium ${
                  selectedPassage.difficulty === "Beginner"
                    ? "text-emerald-400"
                    : selectedPassage.difficulty === "Intermediate"
                      ? "text-blue-300"
                      : "text-violet-300"
                }`}
              >
                {selectedPassage.difficulty}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-5">
        {/* Audio + Settings row */}
        {testState !== "running" && testState !== "finished" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* Audio section */}
            <Card className="bg-white shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-navy flex items-center gap-2">
                  <Headphones className="w-4 h-4" />
                  Listen to Dictation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-muted-foreground">
                  Listen to the passage first, then start your dictation test.
                </p>

                {/* Audio Upload */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-navy">
                    अपना Audio Upload करें (Optional)
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <input
                      ref={audioFileRef}
                      type="file"
                      accept=".mp3,.wav,.ogg,.m4a"
                      onChange={handleAudioUpload}
                      className="hidden"
                      id="audio-file-input"
                    />
                    <label
                      htmlFor="audio-file-input"
                      className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-teal text-teal text-xs font-medium hover:bg-teal hover:text-white transition-colors"
                      data-ocid="shorthand.upload_button"
                    >
                      <Upload className="w-3 h-3" />
                      Audio File Upload
                    </label>
                    {uploadedAudioName && (
                      <div className="flex items-center gap-1.5 bg-teal/10 rounded-md px-2 py-1">
                        <span className="text-xs text-teal truncate max-w-28">
                          {uploadedAudioName}
                        </span>
                        <button
                          type="button"
                          onClick={removeUploadedAudio}
                          className="text-teal hover:text-red-500 transition-colors"
                          data-ocid="shorthand.close_button"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                  {uploadedAudioUrl && (
                    <audio
                      ref={audioElementRef}
                      controls
                      src={uploadedAudioUrl}
                      className="w-full h-9 mt-1"
                    >
                      <track kind="captions" />
                    </audio>
                  )}
                  {uploadedAudioUrl && (
                    <p className="text-xs text-teal">
                      ✓ Uploaded audio active – TTS disabled
                    </p>
                  )}
                </div>

                {/* TTS - only shown when no audio uploaded */}
                {!uploadedAudioUrl && (
                  <div className="space-y-3">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-semibold text-navy">
                        TTS Dictation Speed
                      </span>
                      <div className="flex gap-2">
                        {Object.keys(wpmRates).map((speed) => (
                          <button
                            type="button"
                            key={speed}
                            onClick={() => setSelectedSpeed(speed)}
                            className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                              selectedSpeed === speed
                                ? "bg-teal text-white border-teal"
                                : "bg-white text-navy border-border hover:border-teal"
                            }`}
                            data-ocid="shorthand.toggle"
                          >
                            {speed}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-teal hover:bg-teal-dark text-white border-0 gap-2"
                        onClick={playAudio}
                        disabled={isPlaying}
                        data-ocid="shorthand.primary_button"
                      >
                        <Volume2 className="w-4 h-4" />
                        {isPlaying ? "Playing..." : "Listen"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-navy text-navy gap-2"
                        onClick={stopAudio}
                        disabled={!isPlaying}
                        data-ocid="shorthand.cancel_button"
                      >
                        <Square className="w-3 h-3" />
                        Stop
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-navy text-navy gap-2"
                        onClick={playAudio}
                        data-ocid="shorthand.edit_button"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Replay
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Timer section */}
            <Card className="bg-white shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-navy flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Set Duration & Start
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-navy">
                    Test Duration
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.keys(timeDurations).map((dur) => (
                      <button
                        type="button"
                        key={dur}
                        onClick={() => setSelectedDuration(dur)}
                        className={`px-3 py-2 rounded-md text-xs font-semibold border transition-all ${
                          selectedDuration === dur
                            ? "bg-navy text-white border-navy"
                            : "bg-white text-navy border-border hover:border-navy"
                        }`}
                        data-ocid="shorthand.tab"
                      >
                        {dur}
                      </button>
                    ))}
                  </div>
                </div>
                <Button
                  className="w-full bg-teal hover:bg-teal-dark text-white border-0"
                  onClick={startDictation}
                  data-ocid="shorthand.submit_button"
                >
                  Start Dictation
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Typing area */}
        <AnimatePresence>
          {(testState === "running" || testState === "finished") && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Card className="bg-white shadow-card">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base text-navy">
                      Type Your Transcription
                    </CardTitle>
                    {testState === "running" && (
                      <div
                        className={`flex items-center gap-1 font-mono font-bold text-lg ${
                          timeLeft <= 60 ? "text-red-600" : "text-teal"
                        }`}
                        data-ocid="shorthand.loading_state"
                      >
                        <Clock className="w-4 h-4" />
                        {formatTime(timeLeft)}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea
                    ref={textareaRef}
                    value={typedText}
                    onChange={(e) => setTypedText(e.target.value)}
                    disabled={testState !== "running"}
                    placeholder="Type your transcription here..."
                    className="min-h-48 font-mono text-sm resize-none"
                    data-ocid="shorthand.textarea"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Words:{" "}
                      {typedText.trim().split(/\s+/).filter(Boolean).length}
                    </span>
                    {testState === "running" && (
                      <Button
                        size="sm"
                        className="bg-navy hover:bg-navy-dark text-white border-0"
                        onClick={() => finishTest(typedText)}
                        data-ocid="shorthand.save_button"
                      >
                        Submit
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {results && testState === "finished" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              data-ocid="shorthand.success_state"
            >
              <Card className="bg-white shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <CardTitle className="text-navy">
                      Dictation Result
                    </CardTitle>
                    <CheckCircle2 className="w-6 h-6 text-teal" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "WPM", value: wpm },
                      { label: "Accuracy", value: `${results.accuracy}%` },
                      { label: "Correct Words", value: results.correct },
                      {
                        label: "Errors",
                        value: results.total - results.correct,
                      },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-lg p-4 text-center bg-section-band border border-border"
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

                  {/* Word diff */}
                  <div>
                    <h3 className="font-semibold text-navy mb-3 text-sm">
                      Word-by-Word Analysis
                    </h3>
                    <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-2 bg-section-band rounded-lg">
                      {results.comparison.map((item, i) => (
                        <span
                          key={`${item.word}-${i}`}
                          className={`px-2 py-0.5 rounded text-xs font-medium ${
                            item.status === "correct"
                              ? "bg-green-100 text-green-800"
                              : item.status === "wrong"
                                ? "bg-red-100 text-red-800"
                                : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {item.word}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded bg-green-100 inline-block" />
                        Correct
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded bg-red-100 inline-block" />
                        Wrong
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded bg-orange-100 inline-block" />
                        Missing
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={resetPractice}
                      className="border-navy text-navy"
                      data-ocid="shorthand.delete_button"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        resetPractice();
                        setSelectedPassage(null);
                      }}
                      className="border-navy text-navy"
                      data-ocid="shorthand.close_button"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Passages
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
