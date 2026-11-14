/** Shared section opener: a rule that draws in from its node, the title, and one real fact. */
export function SectionHead({ id, title, meta }: { id: string; title: string; meta?: string }) {
  return (
    <header className="shead">
      <span className="shead__rule" data-rule aria-hidden="true" />
      <span className="shead__node" aria-hidden="true" />
      <h2 id={`${id}-title`} className="shead__title" data-reveal="line">
        <span>{title}</span>
      </h2>
      {meta && (
        <p className="shead__meta" data-reveal="">
          {meta}
        </p>
      )}
    </header>
  );
}
