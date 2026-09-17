"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { units } from "@/data/questions";

export default function HomePage() {
  const router = useRouter();
  const [student, setStudent] = useState({ name:"", studentId:"", school:"", grade:"" });

  useEffect(() => {
    const saved = localStorage.getItem("tm_student");
    if (saved) setStudent(JSON.parse(saved));
  }, []);

  function start(unitId: string) {
    if (!student.name || !student.studentId || !student.school || !student.grade) {
      document.getElementById("student-form")?.scrollIntoView({ behavior:"smooth" });
      return;
    }
    localStorage.setItem("tm_student", JSON.stringify(student));
    localStorage.setItem("tm_unit", unitId);
    router.push("/test");
  }

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">Applied Technology Schools</div>
            <h1>Mathematics assessment, built for serious learning.</h1>
            <p>TECHMATH ACADEMY gives students structured practice and timed assessments while teachers and administrators manage a centralized question bank and results.</p>
            <div style={{display:"flex",gap:10,marginTop:24}}>
              <a className="btn btn-primary" href="#student-form">Start as Student</a>
              <a className="btn btn-secondary" href="/admin/login">Teacher / Admin</a>
            </div>
          </div>
          <div className="hero-card">
            <div style={{fontSize:12,opacity:.7,textTransform:"uppercase",letterSpacing:".1em"}}>Platform structure</div>
            <div className="stat"><span>Student portal</span><strong>✓</strong></div>
            <div className="stat"><span>Teacher portal</span><strong>✓</strong></div>
            <div className="stat"><span>Admin controls</span><strong>✓</strong></div>
            <div className="stat"><span>Central database</span><strong>Supabase</strong></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><div className="eyebrow">Curriculum</div><h2>Choose a unit</h2></div>
            <span className="muted">16 lessons · timed assessment</span>
          </div>
          <div className="units">
            {units.map((u) => (
              <article className="unit-card" key={u.id}>
                <div className="unit-code">{u.code}</div>
                <h3>{u.title}</h3>
                <p className="muted">{u.description}</p>
                <div className="pill-row"><span className="pill">{u.lesson_count} lessons</span><span className="pill">20-question test</span><span className="pill">30 minutes</span></div>
                <button className="btn btn-primary" onClick={() => start(u.id)}>Start assessment →</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="student-form">
        <div className="container">
          <div className="form-card">
            <div className="eyebrow">Student registration for this assessment</div>
            <h2 style={{margin:"8px 0 7px"}}>Enter your academic details</h2>
            <p className="muted">These details are attached to your result so your teacher can identify the attempt.</p>
            <div className="form-grid" style={{marginTop:22}}>
              <div className="field"><label>Full name</label><input value={student.name} onChange={e=>setStudent({...student,name:e.target.value})} placeholder="Student full name"/></div>
              <div className="field"><label>Student ID</label><input value={student.studentId} onChange={e=>setStudent({...student,studentId:e.target.value})} placeholder="e.g. ATS-2026-001"/></div>
              <div className="field"><label>School</label><input value={student.school} onChange={e=>setStudent({...student,school:e.target.value})} placeholder="School name"/></div>
              <div className="field"><label>Class / Grade</label><input value={student.grade} onChange={e=>setStudent({...student,grade:e.target.value})} placeholder="e.g. Grade 11"/></div>
              <div className="field full"><small className="muted">Fill all four fields, then choose a unit above to begin.</small></div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer"><div className="container">TECHMATH ACADEMY · Professional mathematics assessment platform</div></footer>
    </main>
  );
}
