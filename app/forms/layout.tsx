import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FormsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="wrapper">
      <Header className="header-light transparent scroll-light" />
      <div id="content">
        <section className="no-top" style={{ paddingTop: '120px' }}>
          {children}
        </section>
      </div>
      <Footer />
    </div>
  );
}
