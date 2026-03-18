import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PracticeSession } from "../backend";
import { Difficulty } from "../backend";
import { useActor } from "./useActor";

export function useGetSessionHistory() {
  const { actor, isFetching } = useActor();
  return useQuery<PracticeSession[]>({
    queryKey: ["sessionHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSessionHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRecordSession() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      wpm,
      accuracy,
      difficulty,
    }: {
      wpm: bigint;
      accuracy: number;
      difficulty: Difficulty;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.recordSession(wpm, accuracy, difficulty);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessionHistory"] });
    },
  });
}

export { Difficulty };
