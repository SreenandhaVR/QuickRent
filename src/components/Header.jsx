import Link from 'next/link';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const AnimatedHeader = dynamic(() => import('./AnimatedHeader'), {
  ssr: false,
});

export default function Header() {
  const pathname = usePathname();

  if (pathname !== '/') {
    return null;
  }

  return <AnimatedHeader />;
}