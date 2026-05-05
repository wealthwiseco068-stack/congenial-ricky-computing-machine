import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-6">
        <h1 className="font-serif text-6xl text-foreground mb-4">404</h1>
        <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist.</p>
        <Link href="/" className="bg-primary text-primary-foreground px-8 py-3 text-sm uppercase tracking-widest hover:opacity-90 transition-all">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
