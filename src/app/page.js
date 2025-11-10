import Link from 'next/link';
import { categories, items } from '@/data/items';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6">
          Rent Anything,
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            {" "}Anytime
          </span>
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          From cameras to bikes, find everything you need without buying. 
          Save money and reduce waste.
        </p>
        <Link 
          href="/items"
          className="inline-block bg-primary px-8 py-4 rounded-lg text-lg font-semibold hover:scale-105 transition"
        >
          Start Browsing
        </Link>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link 
              key={cat.name}
              href={`/items?category=${cat.name}`}
              className="glass-card p-6 text-center rounded-xl hover:scale-105 transition"
            >
              <div className="text-4xl mb-2">{cat.icon}</div>
              <h3 className="font-semibold">{cat.name}</h3>
              <p className="text-sm text-gray-400">{cat.count} items</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Items */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Items</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.slice(0, 3).map((item) => (
            <Link 
              key={item.id}
              href={`/items/${item.id}`}
              className="glass-card rounded-xl overflow-hidden hover:scale-105 transition"
            >
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-primary text-xl font-bold">
                    ${item.price}/day
                  </span>
                  <span className="text-sm text-gray-400">
                    ⭐ {item.rating}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}