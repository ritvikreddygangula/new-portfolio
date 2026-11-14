/** Reading progress as a belt: it starts white and is black by the end of the page. */
export function Belt() {
  return (
    <div className="belt" data-belt aria-hidden="true">
      <span className="belt__fill" />
    </div>
  );
}
