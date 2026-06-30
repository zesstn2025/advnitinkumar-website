import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer>
      <div className="ft-inn">
        <div className="ft-br">
          <div className="ft-lg">
            <div className="ft-lgb">⚖</div>Adv. Nitin Kumar
          </div>
          <p className="ft-dsc">
            MA LLB · Advocate &amp; Legal Consultant practicing before the Courts
            of Uttar Pradesh for 9+ years. Integrity, clarity, and decisive
            legal strategy — at every step.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
            <a href="tel:+919889374344" style={{ padding: "8px 14px", border: "1px solid rgba(200,168,120,.22)", borderRadius: 8, fontSize: 12, color: "var(--w1)" }}>
              📞 Call
            </a>
            <a href="mailto:advnitin2@gmail.com" style={{ padding: "8px 14px", border: "1px solid rgba(200,168,120,.22)", borderRadius: 8, fontSize: 12, color: "var(--w1)" }}>
              ✉ Email
            </a>
            <a href="https://wa.me/919889374344" target="_blank" rel="noopener" style={{ padding: "8px 14px", border: "1px solid rgba(37,211,102,.25)", borderRadius: 8, fontSize: 12, color: "#25D366" }}>
              💬 WhatsApp
            </a>
          </div>
        </div>
        <div className="ft-cl">
          <h4>Quick Links</h4>
          <div className="ft-lks">
            <Link href="/#about">About Advocate</Link>
            <Link href="/#practice">Practice Areas</Link>
            <Link href="/#services">Services</Link>
            <Link href="/blog">Articles</Link>
            <Link href="/#contact">Contact</Link>
          </div>
        </div>
        <div className="ft-cl">
          <h4>Contact</h4>
          <div className="ft-lks">
            <a href="tel:+919889374344">+91 98893 74344</a>
            <a href="mailto:advnitin2@gmail.com">advnitin2@gmail.com</a>
          </div>
        </div>
      </div>
      <div className="ft-bt">
        <div className="ft-cp">
          © {new Date().getFullYear()} Adv. Nitin Kumar. All rights reserved. ·
          Justice · Integrity · Excellence
        </div>
        <div
          className="zb"
          style={{ cursor: "pointer" }}
          title="Designed & Built by Zesst Now Services Pvt. Ltd."
        >
          <div className="zb-dt"></div>
          <div className="zb-t">
            Designed &amp; Built by <strong>Zesst Now Services Pvt. Ltd.</strong>
          </div>
        </div>
      </div>
    </footer>
  );
}
