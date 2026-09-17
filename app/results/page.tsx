"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { units } from "@/data/questions";

export default function ResultsPage() {
  const [result,setResult] = useState<any>(null);
  useEffect(()=>{ const x=localStorage.getItem("tm_last_result"); if(x)setResult(JSON.parse(x)); },[]);
  if(!result) return <main><div className="container"><div className="empty">No result found. <Link href="/" style={{color:"var(--primary)"}}>Start a test</Link>.</div></div></main>;
  const unit=units.find(u=>u.id===result.unit);
  return <main>
    <div className="container">
      <div className="result-card">
        <div className="eyebrow">Assessment complete</div>
        <h1 style={{marginBottom:4}}>Your result</h1>
        <p className="muted">{unit?.title} · {result.student_name}</p>
        <div className="score-circle">{result.percentage}%</div>
        <h2>{result.score} / {result.total}</h2>
        <p className="muted">{result.percentage >= 80 ? "Strong performance." : result.percentage >= 60 ? "Good progress. Review the missed questions." : "Keep practicing and try again."}</p>
        <div className="result-meta">
          <div className="meta"><small>Student</small><strong>{result.student_name}</strong></div>
          <div className="meta"><small>Student ID</small><strong>{result.student_id}</strong></div>
          <div className="meta"><small>School</small><strong>{result.school}</strong></div>
          <div className="meta"><small>Class / Grade</small><strong>{result.grade}</strong></div>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:10,flexWrap:"wrap"}}>
          <button className="btn btn-secondary" onClick={()=>window.print()}>Print result</button>
          <Link href="/" className="btn btn-primary">Back to academy</Link>
        </div>
      </div>
    </div>
  </main>
}
