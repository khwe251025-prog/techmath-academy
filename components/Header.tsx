import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand">
          <span className="brand-mark">T</span>
          <span>
            <strong>TECHMATH</strong>
            <small>ACADEMY</small>
          </span>
        </Link>
        <nav className="top-nav">
          <Link href="/">Home</Link>
          <Link href="/admin/login">Teacher / Admin</Link>
        </nav>
      </div>
    </header>
  );
}
