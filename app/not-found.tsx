import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404, not in the sources",
  description: "Nothing on this site matches that address. Head back to the portfolio of Ritvik Reddy Gangula.",
};

export default function NotFound() {
  return (
    <section className="lost" aria-labelledby="lost-title">
      <div className="lost__in">
        <p className="lost__code">404</p>
        <h1 id="lost-title" className="lost__title">
          Not in the <em>sources.</em>
        </h1>
        <ol className="lost__hits" aria-label="What was retrieved for this address">
          <li>
            <span>0.00</span>
            <span>No page</span>
            <span>dropped</span>
          </li>
          <li>
            <span>0.00</span>
            <span>No section</span>
            <span>dropped</span>
          </li>
          <li>
            <span>0.00</span>
            <span>No file</span>
            <span>dropped</span>
          </li>
        </ol>
        <p className="lost__text">
          <span className="stamp">Refused</span>
          Nothing on this site matches that address, and I would rather say so than guess.
        </p>
        <a className="btn btn--solid" href="/">
          <span>Back to the first page</span>
        </a>
      </div>
    </section>
  );
}
