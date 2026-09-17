export type Role = "student" | "teacher" | "admin";

export type Unit = {
  id: string;
  code: string;
  title: string;
  description: string;
  lesson_count: number;
};

export type Question = {
  id: string;
  unit: string;
  lesson: string;
  difficulty: "Easy" | "Medium" | "Hard";
  prompt: string;
  options: string[];
  answer: number;
  explanation?: string;
};

export type StudentProfile = {
  id?: string;
  name: string;
  studentId: string;
  school: string;
  grade: string;
};

export type TestResult = {
  id?: string;
  student_name: string;
  student_id: string;
  school: string;
  grade: string;
  unit: string;
  score: number;
  total: number;
  percentage: number;
  answers: number[];
  question_ids: string[];
  created_at?: string;
};
