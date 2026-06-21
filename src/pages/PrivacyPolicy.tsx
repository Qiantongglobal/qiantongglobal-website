import { ArrowLeft, Shield, Mail, Cookie, Database, Eye, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container-custom py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container-custom py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center">
                <Shield size={28} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">Privacy Policy</h1>
                <p className="text-sm text-muted-foreground mt-1">Last updated: June 2026</p>
              </div>
            </div>

            <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed space-y-8">
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">1. Introduction</h2>
                <p>
                  Qiantong Global ("we", "our", or "us") is committed to protecting your personal data. 
                  This Privacy Policy explains how we collect, use, store, and share your information 
                  when you visit our website (qiantongglobal.com) or submit an inquiry through our contact form.
                </p>
                <p className="mt-2">
                  This policy complies with the General Data Protection Regulation (GDPR) (EU) 2016/679 
                  and applicable data protection laws.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">2. Data Controller</h2>
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <p className="font-medium text-foreground">Qiantong Global</p>
                  <p>Changyuan, Henan, China</p>
                  <p className="mt-2">
                    Contact: <a href="mailto:info@qiantongglobal.com" className="text-primary hover:underline">info@qiantongglobal.com</a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">3. Information We Collect</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Database size={18} className="text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Inquiry Form Data</p>
                      <p className="text-sm">When you submit our contact form, we collect: name, email address, company name, phone number, product interest, and message content.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Cookie size={18} className="text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Cookie Data</p>
                      <p className="text-sm">We use essential cookies for website functionality. With your consent, we may use analytics cookies to understand site usage.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Eye size={18} className="text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Automatically Collected Data</p>
                      <p className="text-sm">Browser type, device type, IP address (anonymized), and pages visited.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">4. How We Use Your Data</h2>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Respond to your inquiries and provide quotes for products</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Communicate with you via email or WhatsApp regarding your requests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Improve our website and services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Comply with legal obligations</span>
                  </li>
                </ul>
                <p className="mt-3 text-sm">
                  <strong>Legal basis:</strong> We process your data based on your consent (when you submit the form) 
                  and our legitimate business interest in responding to your inquiry.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">5. Data Sharing</h2>
                <p>
                  We do <strong>not</strong> sell, rent, or trade your personal data to third parties.
                </p>
                <p className="mt-2">
                  Your inquiry data is transmitted via Formspree (a third-party form processing service) 
                  and delivered to our business email. Formspree processes data in compliance with GDPR 
                  and acts as a data processor on our behalf.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">6. Data Retention</h2>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p>
                      We retain inquiry data for <strong>12 months</strong> from the date of submission, 
                      unless you request earlier deletion or a business relationship is established 
                      (in which case data is retained as part of our business records).
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">7. Your Rights (GDPR)</h2>
                <p className="mb-3">Under GDPR, you have the following rights:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: "Access", desc: "Request a copy of your personal data" },
                    { title: "Rectification", desc: "Correct inaccurate or incomplete data" },
                    { title: "Erasure", desc: "Request deletion of your personal data" },
                    { title: "Portability", desc: "Receive your data in a machine-readable format" },
                    { title: "Objection", desc: "Object to processing based on legitimate interests" },
                    { title: "Withdraw Consent", desc: "Withdraw consent at any time" },
                  ].map((right) => (
                    <div key={right.title} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <p className="font-medium text-foreground text-sm">{right.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{right.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm">
                  To exercise any of these rights, please contact us at{" "}
                  <a href="mailto:info@qiantongglobal.com" className="text-primary hover:underline">info@qiantongglobal.com</a>.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">8. International Data Transfers</h2>
                <p>
                  As our business is based in China, your data may be transferred to and processed in China. 
                  We ensure appropriate safeguards are in place, including standard contractual clauses 
                  or other mechanisms approved by the European Commission.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">9. Cookies</h2>
                <p>
                  We use essential cookies that are necessary for the website to function. 
                  With your consent, we may also use analytics cookies. You can manage your cookie 
                  preferences at any time through our cookie consent banner or by contacting us.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">10. Contact Us</h2>
                <div className="bg-teal-50 rounded-xl p-6 border border-teal-100">
                  <p className="font-medium text-foreground">If you have any questions about this Privacy Policy:</p>
                  <div className="mt-3 space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                      <Mail size={14} className="text-primary" />
                      <a href="mailto:info@qiantongglobal.com" className="text-primary hover:underline">info@qiantongglobal.com</a>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-primary">📍</span>
                      Changyuan, Henan, China
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
