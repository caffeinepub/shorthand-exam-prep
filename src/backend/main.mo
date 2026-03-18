import Map "mo:core/Map";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Principal "mo:core/Principal";

actor {
  type Difficulty = {
    #beginner;
    #intermediate;
    #advanced;
    #exam;
  };

  type PracticeSession = {
    wpm : Nat;
    accuracy : Float;
    difficulty : Difficulty;
    timestamp : Time.Time;
  };

  module PracticeSession {
    public func compare(a : PracticeSession, b : PracticeSession) : Order.Order {
      Int.compare(b.timestamp, a.timestamp);
    };
  };

  let sessions = Map.empty<Principal, [PracticeSession]>();

  public shared ({ caller }) func recordSession(wpm : Nat, accuracy : Float, difficulty : Difficulty) : async () {
    let newSession : PracticeSession = {
      wpm;
      accuracy;
      difficulty;
      timestamp = Time.now();
    };

    switch (sessions.get(caller)) {
      case (null) {
        sessions.add(caller, [newSession]);
      };
      case (?existing) {
        sessions.add(caller, existing.concat([newSession]));
      };
    };
  };

  public query ({ caller }) func getSessionHistory() : async [PracticeSession] {
    switch (sessions.get(caller)) {
      case (null) { [] };
      case (?userSessions) { userSessions.sort() };
    };
  };
};
