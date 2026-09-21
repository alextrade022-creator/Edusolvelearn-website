import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Resets scroll position to the top whenever the route changes, matching the
// fresh-page feel of the original multi-page site.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
