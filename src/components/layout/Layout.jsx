import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import FloatingWhatsApp from '../ui/FloatingWhatsApp';

// App shell shared by every route: sticky header, page content, footer and the
// floating WhatsApp button.
export default function Layout() {
  return (
    <div className="font-sans text-brand-ink overflow-x-hidden">
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
