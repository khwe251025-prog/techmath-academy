"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { Question } from "@/types";
import { demoQuestions, units } from "@/data/questions";

const blank:Question={id:"",unit:"unit-5",lesson:"",difficulty:"Medium",prompt:"",options:["","","",""],answer:0,explanation:""};

export default function AdminPage(){
  const router=useRouter();
  const [user,setUser]=useState<any>(null);
  const [questions,setQuestions]=useState<Question[]>([]);
  const [results,setResults]=useState<any[]>([]);
  const [editing,setEditing]=useState<Question>(blank);
  const [message,setMessage]=useState("");
  const [error,setError]=useState("");
  const [search,setSearch]=useState("");

  useEffect(()=>{
    if(!isSupabaseConfigured || !supabase){setError("Supabase is not configured. The admin portal is intentionally locked.");return;}
    supabase.auth.getUser().then(async ({data})=>{
      if(!data.user){router.replace("/admin/login");return;}
      setUser(data.user); load();
    });
  },[router]);

  async function load(){
    if(!supabase)return;
    const [q,r]=await Promise.all([
      supabase.from("questions").select("*").order("unit").order("lesson"),
      supabase.from("results").select("*").order("created_at",{ascending:false}).limit(12)
    ]);
    if(q.error)setError(q.error.message); else setQuestions((q.data||[]) as Question[]);
    if(!r.error)setResults(r.data||[]);
  }

  async function saveQuestion(){
    setError("");setMessage("");
    if(!supabase)return;
    if(!editing.prompt || editing.options.some(x=>!x.trim())){setError("Complete the question and all four options.");return;}
    const payload={unit:editing.unit,lesson:editing.lesson,difficulty:editing.difficulty,prompt:editing.prompt,options:editing.options,answer:editing.answer,explanation:editing.explanation||""};
    const {error}=editing.id ? await supabase.from("questions").update(payload).eq("id",editing.id) : await supabase.from("questions").insert(payload);
    if(error){setError(error.message);return;}
    setMessage("Question saved.");setEditing(blank);load();
  }
  async function remove(id:string){
    if(!supabase || !confirm("Delete this question?"))return;
    const {error}=await supabase.from("questions").delete().eq("id",id);
    if(error)setError(error.message);else{setMessage("Question deleted.");load();}
  }
  async function logout(){await supabase?.auth.signOut();router.replace("/admin/login");}

  const filtered=questions.filter(q=>`${q.prompt} ${q.lesson}`.toLowerCase().includes(search.toLowerCase()));
  const avg=results.length ? Math.round(results.reduce((a,r)=>a+Number(r.percentage),0)/results.length) : 0;

  return <main className="admin-wrap">
    <div className="container">
      <div className="admin-header">
        <div><div className="eyebrow">Protected management portal</div><h1 style={{margin:"5px 0"}}>Teacher / Admin Dashboard</h1><div className="muted">{user?.email}</div></div>
        <button className="btn btn-secondary" onClick={logout}>Sign out</button>
      </div>
      {error&&<div className="error">{error}</div>}{message&&<div className="success">{message}</div>}
      <div className="admin-grid">
        <div className="metric"><small>Questions</small><strong>{questions.length}</strong></div>
        <div className="metric"><small>Recent test attempts</small><strong>{results.length}</strong></div>
        <div className="metric"><small>Average score</small><strong>{avg}%</strong></div>
      </div>
      <div className="admin-layout">
        <section className="admin-card">
          <h3>{editing.id?"Edit question":"Create question"}</h3>
          <div className="field" style={{marginBottom:12}}><label>Unit</label><select value={editing.unit} onChange={e=>setEditing({...editing,unit:e.target.value})}>{units.map(u=><option key={u.id} value={u.id}>{u.code} · {u.title}</option>)}</select></div>
          <div className="field" style={{marginBottom:12}}><label>Lesson</label><input value={editing.lesson} onChange={e=>setEditing({...editing,lesson:e.target.value})} placeholder="Lesson title"/></div>
          <div className="field" style={{marginBottom:12}}><label>Difficulty</label><select value={editing.difficulty} onChange={e=>setEditing({...editing,difficulty:e.target.value as any})}><option>Easy</option><option>Medium</option><option>Hard</option></select></div>
          <div className="field" style={{marginBottom:12}}><label>Question</label><textarea rows={4} value={editing.prompt} onChange={e=>setEditing({...editing,prompt:e.target.value})}/></div>
          {editing.options.map((o,i)=><div className="field" style={{marginBottom:10}} key={i}><label>Option {String.fromCharCode(65+i)}</label><input value={o} onChange={e=>setEditing({...editing,options:editing.options.map((x,j)=>j===i?e.target.value:x)})}/></div>)}
          <div className="field" style={{marginBottom:12}}><label>Correct answer</label><select value={editing.answer} onChange={e=>setEditing({...editing,answer:Number(e.target.value)})}>{editing.options.map((_,i)=><option key={i} value={i}>{String.fromCharCode(65+i)}</option>)}</select></div>
          <div className="field" style={{marginBottom:16}}><label>Explanation</label><textarea rows={3} value={editing.explanation||""} onChange={e=>setEditing({...editing,explanation:e.target.value})}/></div>
          <div style={{display:"flex",gap:8}}><button className="btn btn-primary" onClick={saveQuestion}>{editing.id?"Update":"Create"} question</button>{editing.id&&<button className="btn btn-ghost" onClick={()=>setEditing(blank)}>Cancel</button>}</div>
        </section>
        <div style={{display:"grid",gap:20}}>
          <section className="admin-card">
            <div style={{display:"flex",justifyContent:"space-between",gap:12,alignItems:"center",marginBottom:15}}><h3 style={{margin:0}}>Question Bank</h3><input style={{maxWidth:240,padding:10,border:"1px solid #d8e0ea",borderRadius:9}} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search…"/></div>
            <div className="table-wrap"><table className="table"><thead><tr><th>Lesson</th><th>Difficulty</th><th>Question</th><th></th></tr></thead><tbody>{filtered.map(q=><tr key={q.id}><td>{q.lesson}</td><td>{q.difficulty}</td><td style={{maxWidth:390,overflow:"hidden",textOverflow:"ellipsis"}}>{q.prompt}</td><td><button className="btn btn-secondary" onClick={()=>setEditing(q)}>Edit</button> <button className="btn btn-danger" onClick={()=>remove(q.id)}>Delete</button></td></tr>)}</tbody></table></div>
          </section>
          <section className="admin-card">
            <h3>Recent Results</h3>
            <div className="table-wrap"><table className="table"><thead><tr><th>Student</th><th>School</th><th>Unit</th><th>Score</th><th>Date</th></tr></thead><tbody>{results.map(r=><tr key={r.id}><td>{r.student_name}<br/><span className="muted">{r.student_id}</span></td><td>{r.school}</td><td>{units.find(u=>u.id===r.unit)?.code||r.unit}</td><td><strong>{r.percentage}%</strong></td><td>{new Date(r.created_at).toLocaleString()}</td></tr>)}</tbody></table></div>
          </section>
        </div>
      </div>
    </div>
  </main>
}
