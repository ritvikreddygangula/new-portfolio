import { ContactForm } from "@/components/contact-form";
import { CopyEmail } from "@/components/copy-email";
import { SectionHead } from "@/components/section-head";
import { contact, site } from "@/data/site";

const channels = [
  { name: "Email", value: site.email, href: `mailto:${site.email}`, external: false },
  { name: "Phone", value: site.phone.label, href: site.phone.href, external: false },
  { name: "LinkedIn", value: site.linkedin.label, href: site.linkedin.href, external: true },
  { name: "GitHub", value: site.github.label, href: site.github.href, external: true },
];

export function ContactSection() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title" tabIndex={-1}>
      <SectionHead id="contact" title={contact.heading} />

      <p className="contact__intro" data-reveal="">
        {contact.intro}
      </p>

      <div className="contact__grid">
        <div data-reveal="">
          <h3 className="contact__sub">Contact information</h3>
          <ul className="channels">
            {channels.map((c) => (
              <li key={c.name}>
                <a
                  className="channel"
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                >
                  <span className="channel__k">{c.name}</span>
                  <span className="channel__v">{c.value}</span>
                  <span className="channel__arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <CopyEmail email={site.email} />
        </div>

        <div data-reveal="">
          <h3 className="contact__sub">Send a message</h3>
          <ContactForm endpoint={site.formEndpoint} />
        </div>
      </div>
    </section>
  );
}
