import Image from "next/image";

const facts = [
  { term: "School", detail: "Arizona State University" },
  { term: "Degree", detail: "B.S. Computer Science, May 2027" },
  { term: "GPA", detail: "4.0, Dean's List six times" },
  { term: "Certified", detail: "AWS Cloud Practitioner", badge: true },
];

export function AboutSection() {
  return (
    <section id="about" className="px-6 py-14 md:py-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
        <h2 className="display display-section lg:col-span-4 text-foreground">About</h2>

        <div className="lg:col-span-8">
          <p className="text-xl md:text-2xl leading-relaxed text-foreground max-w-2xl">
            I&apos;m a software engineer who likes the layer underneath the
            product: queues, retries, and the data paths that decide whether
            a system holds up.
          </p>

          <dl className="mt-10 max-w-2xl border-b border-dotted border-foreground/45">
            {facts.map((fact) => (
              <div
                key={fact.term}
                className="rule-dotted grid grid-cols-[8rem_1fr] items-center gap-4 py-3.5"
              >
                <dt className="label text-muted-foreground">{fact.term}</dt>
                <dd className="flex items-center gap-2.5 text-foreground">
                  {fact.detail}
                  {fact.badge && (
                    <Image
                      src="/certifications/aws-ccp-badge.png"
                      alt=""
                      width={22}
                      height={22}
                      className="object-contain"
                      unoptimized
                    />
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
