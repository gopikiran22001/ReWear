export function Card({ className = "", children }) {
  return (
    <div className={`rounded-lg shadow bg-white ${className}`}>{children}</div>
  );
}

export function CardContent({ className = "", children }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
