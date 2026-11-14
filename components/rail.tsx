import { nav } from "@/data/site";

/** Desktop only: a packet travels the page; each stop is a section at its true scroll position. */
export function Rail() {
  return (
    <div className="rail" data-rail aria-hidden="true">
      <span className="rail__packet" />
      {nav.map((item) => (
        <span key={item.id} className="rail__stop" data-stop={item.id}>
          <i>{item.name}</i>
        </span>
      ))}
    </div>
  );
}
