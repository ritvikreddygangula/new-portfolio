"use client";

import { useState } from "react";

/**
 * A YouTube player that costs nothing until it is wanted: a local cover image with a play
 * button, swapped for the real player (no-cookie domain) on click.
 */
export function YouTube({ id, poster, title }: { id: string; poster: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="yt">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" className="yt__play" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
          <img src={poster} alt="" width={1280} height={720} loading="lazy" decoding="async" />
          <span className="yt__btn" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path d="M8 5.5v13l11-6.5Z" fill="currentColor" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
