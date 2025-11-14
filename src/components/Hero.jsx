import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const AnimatedContent = dynamic(() => import('./AnimatedContent'), {
  ssr: false,
});

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" role="banner">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80"
        alt="Modern city skyline at night with glowing lights"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
      
      {/* Content */}
      <AnimatedContent />
    </section>
  );
}