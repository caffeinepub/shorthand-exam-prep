import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface PracticeSession {
    wpm: bigint;
    difficulty: Difficulty;
    timestamp: Time;
    accuracy: number;
}
export enum Difficulty {
    intermediate = "intermediate",
    beginner = "beginner",
    advanced = "advanced",
    exam = "exam"
}
export interface backendInterface {
    getSessionHistory(): Promise<Array<PracticeSession>>;
    recordSession(wpm: bigint, accuracy: number, difficulty: Difficulty): Promise<void>;
}
