
import { usePathname } from 'next/navigation';

interface RouteSegments {
  firstRoute: string;
  secondRoute: string;
  thirdRoute: string;
  pathname: string;
}

export default function useRouterSegments(): RouteSegments | null {
  const pathname = usePathname();
  const regex = /^\/([^/]+)\/([^/]+)\/([^/]+)/;
  const match = pathname.match(regex);

  if (match) {
    const firstRoute = match[1];
    const secondRoute = match[2];
    const thirdRoute = match[3];

    return { pathname, firstRoute, secondRoute, thirdRoute };
  }

  return null; 
}