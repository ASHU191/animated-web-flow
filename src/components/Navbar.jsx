
import { useState, useEffect } from "react";
import { Menu, X, ChevronUp } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Projects", id: "projects" },
    { name: "Partners", id: "partners" },
    { name: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // For navbar background
      setIsScrolled(window.scrollY > 20);
      
      // For back to top button
      setShowScrollTop(window.scrollY > 500);
      
      // For active section highlight
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if(window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveSection(section.getAttribute('id'));
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavLinkClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const handleLogoClick = () => {
    scrollToTop();
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/50 py-4' : 'py-6'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <nav className="flex items-center justify-between">
            <div 
              className="text-2xl font-bold text-foreground cursor-pointer flex items-center group"
              onClick={handleLogoClick}
            >
              <span className="text-primary mr-1">W</span>ebelo
              <span className="block w-2 h-2 bg-primary rounded-full ml-1 group-hover:animate-pulse-slow"></span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={() => handleNavLinkClick(link.id)}
                >
                  {link.name}
                </button>
              ))}
            </div>
            
            {/* Mobile Navigation */}
            <button 
              className="md:hidden text-foreground z-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close Menu" : "Open Menu"}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-background/95 backdrop-blur-md z-30 flex flex-col justify-center items-center gap-8 transition-transform duration-500 md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {navLinks.map((link) => (
          <button
            key={link.id}
            className={`text-2xl font-medium ${activeSection === link.id ? 'text-primary' : 'text-foreground'} hover:text-primary transition-colors duration-300`}
            onClick={() => handleNavLinkClick(link.id)}
          >
            {link.name}
          </button>
        ))}
      </div>
      
      {/* Back to top button */}
      <button 
        className={`fixed right-6 bottom-6 bg-primary/80 hover:bg-primary text-white p-3 rounded-full z-20 transition-all duration-300 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} />
      </button>
    </>
  );
};

export default Navbar;
