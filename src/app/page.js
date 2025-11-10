import Link from "next/link";

export default function Home() {
  return (
  <main className="container mx-auto px-4 py-8">
    <h1>Welcome to QuickRent</h1>
    <Link href="/items">Browse Items</Link>
  </main>
  );
}
