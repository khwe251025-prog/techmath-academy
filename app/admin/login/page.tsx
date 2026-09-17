"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router=useRouter();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    if(!supabase) return;
    supabase.auth.getSession().then(({data})=>{ if(data.session) router.replace("/admin"); });
  },[router]);

  async function login(e:React.FormEvent) {
    e.preventDefault(); setError(""); setLoading(true);
    if(!isSupabaseConfigured || !supabase){setError("Supabase is not configured. Add the environment variables first.");setLoading(false);return;}
    const {error}=await supabase.auth.signInWithPassword({email,password});
    if(error){setError("Login failed. Check your teacher/admin email and password.");setLoading(false);return;}
    router.replace("/admin");
  }

  return <main>
    <div className="container">
      <form className="form-card" onSubmit={login}>
        <div className="eyebrow">Restricted area</div>
        <h1 style={{margin:"8px 0"}}>Teacher / Admin login</h1>
        <p className="muted">This portal is protected by Supabase Authentication. Students cannot access the management dashboard without an authorized account.</p>
        <div className="login-note">Create teacher/admin accounts in Supabase Authentication. Do not add public registration to this page.</div>
        {error && <div className="error">{error}</div>}
        <div className="field" style={{marginBottom:15}}><label>Email</label><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="teacher@school.edu"/></div>
        <div className="field" style={{marginBottom:20}}><label>Password</label><input type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"/></div>
        <button className="btn btn-primary" style={{width:"100%"}} disabled={loading}>{loading?"Signing in…":"Secure sign in"}</button>
      </form>
    </div>
  </main>
}
