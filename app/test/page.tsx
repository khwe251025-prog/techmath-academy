"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { demoQuestions, units } from "@/data/questions";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { Question } from "@/types";

const LETTERS = ["A","B","C","D"];
const TEST_SIZE = 20;
const TOTAL_SECONDS = 30 * 60;

function shuffle<T>(arr:T[]) { return [...arr].sort(() => Math.random() - .5); }

export default function TestPage() {
  const router = useRouter();
  const [questions,setQuestions] = useState<Question[]>([]);
  const [answers,setAnswers] = useState<number[]>([]);
  const [current,setCurrent] = useState(0);
  const [seconds,setSeconds] = useState(TOTAL_SECONDS);
  const [student,setStudent] = useState<any>(null);
  const [unitId,setUnitId] = useState("");
  const [loading,setLoading] = useState(true);
  const [submitting,setSubmitting] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem("tm_student");
    const u = localStorage.getItem("tm_unit");
    if (!s || !u) { router.replace("/"); return; }
    setStudent(JSON.parse(s)); setUnitId(u);
    async function load() {
      let list = demoQuestions.filter(q=>q.unit===u);
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.from("questions").select("*").eq("unit",u);
        if (!error && data?.length) list = data as Question[];
      }
      const selected = shuffle(list).slice(0, Math.min(TEST_SIZE,list.length));
      setQuestions(selected); setAnswers(Array(selected.length).fill(-1)); setLoading(false);
    }
    load();
  }, [router]);

  useEffect(() => {
    if (loading || submitting) return;
    const timer = setInterval(() => setSeconds(s => {
      if (s <= 1) { clearInterval(timer); finish(); return 0; }
      return s - 1;
    }),1000);
    return () => clearInterval(timer);
  }, [loading, submitting, questions, answers, student, unitId]);

  const time = useMemo(() => `${String(Math.floor(seconds/60)).padStart(2,"0")}:${String(seconds%60).padStart(2,"0")}`,[seconds]);

  async function finish() {
    if (submitting || !questions.length || !student) return;
    setSubmitting(true);
    const score = answers.reduce((sum,a,i)=>sum+(a===questions[i]?.answer?1:0),0);
    const result = {
      student_name: student.name, student_id: student.studentId, school: student.school,
      grade: student.grade, unit: unitId, score, total: questions.length,
      percentage: Math.round(score/questions.length*100),
      answers, question_ids: questions.map(q=>q.id)
    };
    localStorage.setItem("tm_last_result", JSON.stringify({...result, questions}));
    if (isSupabaseConfigured && supabase) {
      await supabase.from("results").insert(result);
    }
    router.push("/results");
  }

  if (loading) return <main><div className="container"><div className="empty">Loading assessment…</div></div></main>;
  const q = questions[current];
  const unit = units.find(u=>u.id===unitId);

  return (
    <main className="test-shell">
      <div className="container">
        <div className="test-top">
          <div><div className="eyebrow">{unit?.code}</div><h2 style={{margin:"5px 0"}}>{unit?.title}</h2><div className="muted">{student?.name} · {student?.studentId}</div></div>
          <div className="timer">⏱ {time}</div>
        </div>
        <div className="progress"><div style={{width:`${((current+1)/questions.length)*100}%`}}/></div>
        <div className="question-layout">
          <section className="question-card">
            <div className="question-number">QUESTION {current+1} OF {questions.length} · {q.lesson}</div>
            <div className="question-prompt">{q.prompt}</div>
            <div className="options">
              {q.options.map((option,i)=>(
                <button key={i} className={`option ${answers[current]===i?"selected":""}`} onClick={()=>setAnswers(a=>a.map((v,idx)=>idx===current?i:v))}>
                  <span className="option-letter">{LETTERS[i]}</span><span>{option}</span>
                </button>
              ))}
            </div>
            <div className="question-actions">
              <button className="btn btn-ghost" disabled={current===0} onClick={()=>setCurrent(c=>c-1)}>← Previous</button>
              {current===questions.length-1 ? <button className="btn btn-primary" onClick={finish} disabled={submitting}>{submitting?"Submitting…":"Submit test"}</button> : <button className="btn btn-primary" onClick={()=>setCurrent(c=>c+1)}>Next →</button>}
            </div>
          </section>
          <aside className="side-card">
            <h4>Question map</h4>
            <div className="q-grid">{questions.map((_,i)=><button key={i} className={`q-btn ${i===current?"current":""} ${answers[i]>=0?"answered":""}`} onClick={()=>setCurrent(i)}>{i+1}</button>)}</div>
            <p className="muted" style={{fontSize:12,marginTop:16}}>Green = answered · Blue = current</p>
            <button className="btn btn-danger" style={{width:"100%",marginTop:15}} onClick={()=>{if(confirm("Submit the test now?")) finish()}}>Finish now</button>
          </aside>
        </div>
      </div>
    </main>
  );
}
