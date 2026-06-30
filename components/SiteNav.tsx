import Link from "next/link";

export default function SiteNav() {
  return (
    <>
      <div id="topbar">
        <div className="tb-g">
          <a className="tb-a" href="tel:+919889374344">
            <span>📞</span> +91 98893 74344
          </a>
          <a className="tb-a" href="mailto:advnitin2@gmail.com">
            <span>✉</span> advnitin2@gmail.com
          </a>
        </div>
        <div className="tb-g">
          <span className="tb-t">⚖ Enrollment: UP07579/2017 · Bar Council of U.P.</span>
          <span className="tb-t">Mon–Sat 10AM–7PM</span>
        </div>
      </div>
      <header id="nav" className="scroll" style={{ position: "sticky", top: 0 }}>
        <Link className="nav-logo" href="/">
          <div className="nav-logo-box">⚖</div>Adv. Nitin Kumar
        </Link>
        <nav className="nav-ls">
          <Link href="/#about">About</Link>
          <Link href="/#practice">Practice</Link>
          <Link href="/#services">Services</Link>
          <Link href="/blog">Articles</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <Link className="nav-cta" href="/#contact">
          Consult Now →
        </Link>
      </header>
    </>
  );
}
