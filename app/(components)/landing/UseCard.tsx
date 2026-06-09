import { ReactNode } from 'react';

interface UseCardProps {
  tag: string;
  title?: string;
  body?: string;
  listing?: string[];
  quote?: string;
  author?: string;
  illustration?: ReactNode;
}

export default function UseCard({ tag, title, body, listing, quote, author, illustration }: UseCardProps) {
  if (quote) {
    return (
      <div className="use-card use-card--testimonial">
        <div className="use-card__quote">&ldquo;{quote}&rdquo;</div>
        <div className="use-card__attribution">
          <span className="use-card__author">{author}</span>
          <span className="bracket">{tag}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`use-card${illustration ? ' use-card--benefit' : ''}`}>
      {illustration && (
        <div className="use-card__illus">{illustration}</div>
      )}
      <div className="bracket">{tag}</div>
      <div className="use-card__title">{title}</div>
      <p className="use-card__body">{body}</p>
      {listing && (
        <ul className="use-card__list">
          {listing.map((l, i) => <li key={i}>{l}</li>)}
        </ul>
      )}
    </div>
  );
}
