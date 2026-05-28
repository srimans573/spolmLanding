interface UseCardProps {
  tag: string;
  title: string;
  body: string;
  listing?: string[];
}

export default function UseCard({ tag, title, body, listing }: UseCardProps) {
  return (
    <div className="use-card">
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
