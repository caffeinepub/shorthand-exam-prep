import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Award, Clock, Play, Target, TrendingUp } from "lucide-react";
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
import { useGetSessionHistory } from "../hooks/useQueries";

interface DashboardPageProps {
  navigateTo: (page: Page, difficulty?: Difficulty) => void;
}

const difficultyLabel: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  exam: "Exam Mock",
};

const difficultyColors: Record<string, string> = {
  beginner: "bg-emerald-100 text-emerald-700",
  intermediate: "bg-blue-100 text-blue-700",
  advanced: "bg-violet-100 text-violet-700",
  exam: "bg-orange-100 text-orange-700",
};

function formatDate(ts: bigint): string {
  const ms = Number(ts / BigInt(1_000_000));
  return new Date(ms).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function DashboardPage({ navigateTo }: DashboardPageProps) {
  const { data: sessions, isLoading } = useGetSessionHistory();

  const sorted = [...(sessions ?? [])].sort((a, b) =>
    Number(b.timestamp - a.timestamp),
  );
  const recent = sorted.slice(0, 10);

  const totalSessions = sorted.length;
  const avgWpm =
    totalSessions > 0
      ? Math.round(
          sorted.reduce((s, x) => s + Number(x.wpm), 0) / totalSessions,
        )
      : 0;
  const bestWpm =
    totalSessions > 0 ? Math.max(...sorted.map((x) => Number(x.wpm))) : 0;
  const avgAccuracy =
    totalSessions > 0
      ? Math.round(
          sorted.reduce((s, x) => s + x.accuracy * 100, 0) / totalSessions,
        )
      : 0;

  const chartData = [...recent].reverse().map((s, i) => ({
    session: i + 1,
    wpm: Number(s.wpm),
    accuracy: Math.round(s.accuracy * 100),
  }));

  const stats = [
    { icon: Clock, label: "Total Sessions", value: totalSessions, unit: "" },
    { icon: TrendingUp, label: "Average WPM", value: avgWpm, unit: "WPM" },
    { icon: Award, label: "Best WPM", value: bestWpm, unit: "WPM" },
    { icon: Target, label: "Avg Accuracy", value: avgAccuracy, unit: "%" },
  ];

  return (
    <div className="min-h-screen bg-section-band py-12">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-2xl font-bold text-navy">Your Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Track your shorthand progress over time.
            </p>
          </div>
          <Button
            className="bg-teal hover:bg-teal-dark text-white border-0"
            onClick={() => navigateTo("practice")}
            data-ocid="dashboard.primary_button"
          >
            <Play className="w-4 h-4 mr-2" /> New Practice
          </Button>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card
                className="border-border shadow-card"
                data-ocid={`dashboard.item.${i + 1}`}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-md bg-icon-bg flex items-center justify-center">
                      <stat.icon className="w-4 h-4 text-navy-icon" />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                  {isLoading ? (
                    <Skeleton
                      className="h-8 w-20"
                      data-ocid="dashboard.loading_state"
                    />
                  ) : (
                    <div className="text-3xl font-bold text-navy">
                      {stat.value}
                      {stat.unit && (
                        <span className="text-lg font-medium text-muted-foreground ml-1">
                          {stat.unit}
                        </span>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Chart + Table row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* WPM Chart */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-border shadow-card h-full">
              <CardHeader>
                <CardTitle className="text-navy text-base">
                  WPM Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-52 flex items-center justify-center">
                    <Skeleton className="w-full h-full rounded" />
                  </div>
                ) : chartData.length === 0 ? (
                  <div
                    className="h-52 flex flex-col items-center justify-center text-muted-foreground text-sm gap-2"
                    data-ocid="dashboard.empty_state"
                  >
                    <TrendingUp className="w-8 h-8 opacity-30" />
                    Complete a session to see your progress chart.
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e6eaf0" />
                      <XAxis
                        dataKey="session"
                        tick={{ fontSize: 12 }}
                        label={{
                          value: "Session",
                          position: "insideBottom",
                          offset: -2,
                          fontSize: 12,
                        }}
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="wpm"
                        stroke="#1FA8C6"
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: "#1FA8C6" }}
                        activeDot={{ r: 6 }}
                        name="WPM"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent sessions table */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-border shadow-card h-full">
              <CardHeader>
                <CardTitle className="text-navy text-base">
                  Recent Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="p-6 space-y-3">
                    {[1, 2, 3].map((n) => (
                      <Skeleton key={n} className="h-10 w-full" />
                    ))}
                  </div>
                ) : recent.length === 0 ? (
                  <div
                    className="p-6 text-center text-muted-foreground text-sm"
                    data-ocid="dashboard.table.empty_state"
                  >
                    No sessions yet. Start practicing to see your history!
                  </div>
                ) : (
                  <Table data-ocid="dashboard.table">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead className="text-right">WPM</TableHead>
                        <TableHead className="text-right">Accuracy</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recent.map((session, i) => {
                        const diff = Object.values(
                          session.difficulty,
                        )[0] as string;
                        return (
                          <TableRow
                            key={String(session.timestamp)}
                            data-ocid={`dashboard.row.${i + 1}`}
                          >
                            <TableCell className="text-sm">
                              {formatDate(session.timestamp)}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={`text-xs border-0 ${difficultyColors[diff] ?? ""}`}
                              >
                                {difficultyLabel[diff] ?? diff}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {Number(session.wpm)}
                            </TableCell>
                            <TableCell className="text-right">
                              {Math.round(session.accuracy * 100)}%
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
