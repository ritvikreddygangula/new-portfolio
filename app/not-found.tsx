import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404, nothing here",
  description: "Nothing on this site matches that address. Head back to the portfolio of Ritvik Reddy Gangula.",
};

export default function NotFound() {
  return (
    <section className="lost" aria-labelledby="lost-title">
      <div className="lost__in">
        <p className="lost__code">404</p>
        <h1 id="lost-title" className="lost__title">
          Nothing <em>here</em>
        </h1>
        <p className="lost__text">Nothing lives at this address. Everything I have made is one page away.</p>
        <a className="btn btn--solid" href="/">
          <span>Back to the first page</span>
        </a>
      </div>
    </section>
  );
}
