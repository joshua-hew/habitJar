import { journalEntry } from "../interfaces/interfaces";

export const testJournal: journalEntry[] = [
  {
    title: "Finished Unit tests for increment",
    body:
      "Created u tests for increment. Still need to create for decrement and insert.",
    dateCreated: new Date(2020, 9, 15, 0, 0, 0).toString(),
    lastModified: new Date(2020, 9, 15, 0, 0, 0).toString(),
  },
  {
    title: "Did a lot",
    body: "Finished setup of Redux store and initial data structures.",
    dateCreated: new Date(2020, 9, 17, 0, 0, 0).toString(),
    lastModified: new Date(2020, 9, 17, 0, 0, 0).toString(),
  },
];
