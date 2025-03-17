
import { useEffect, useRef } from "react";
import { ArrowRight, Code, Server, Database } from "lucide-react";

const Hero = () => {
  const floatingElementsRef = useRef([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, { threshold: 0.1 });
    
    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));
    
    // Floating animation for decorative elements
    const floatingElements = floatingElementsRef.current;
    
    const moveElements = () => {
      floatingElements.forEach((el, index) => {
        const randomX = Math.sin(Date.now() / (1500 + (index * 500))) * 15;
        const randomY = Math.cos(Date.now() / (1500 + (index * 500))) * 15;
        
        if (el) {
          el.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }
      });
      
      requestAnimationFrame(moveElements);
    };
    
    const animationId = requestAnimationFrame(moveElements);
    
    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <section id="home" className="min-h-screen pt-28 pb-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div 
        ref={(el) => (floatingElementsRef.current[0] = el)}
        className="absolute top-1/4 left-1/5 w-24 h-24 bg-primary/20 rounded-full blur-3xl transition-transform duration-700"
      ></div>
      <div 
        ref={(el) => (floatingElementsRef.current[1] = el)}
        className="absolute bottom-1/4 right-1/5 w-32 h-32 bg-primary/20 rounded-full blur-3xl transition-transform duration-700"
      ></div>
      <div 
        ref={(el) => (floatingElementsRef.current[2] = el)}
        className="absolute top-1/2 right-1/4 w-16 h-16 bg-primary/20 rounded-full blur-3xl transition-transform duration-700"
      ></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <div className="md:w-1/2 space-y-8">
            <div className="reveal">
              <span className="px-4 py-1 text-xs font-semibold tracking-wider bg-primary/10 border border-primary/20 rounded-full text-primary">
                PREMIUM WEB DEVELOPMENT SERVICES
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight reveal">
              We Build <span className="text-primary">Modern</span> & <span className="text-primary">Scalable</span> Web Solutions
            </h1>
            
            <p className="text-lg text-muted-foreground reveal">
              Transform your business with custom web applications that are tailored to your specific needs. Our team of experts delivers high-quality solutions that help you achieve your business goals.
            </p>
            
            <div className="flex flex-wrap gap-4 reveal">
              <a href="#services" className="btn btn-primary">
                Explore Services
                <ArrowRight className="ml-2 h-4 w-4 inline-block" />
              </a>
              <a href="#contact" className="btn btn-outline">
                Get in Touch
              </a>
            </div>
            
            <div className="flex items-center gap-6 reveal">
              <div className="flex -space-x-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center border-2 border-background">
                  <span className="text-xs font-medium">JS</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center border-2 border-background">
                  <span className="text-xs font-medium">TS</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center border-2 border-background">
                  <span className="text-xs font-medium">RE</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center border-2 border-background">
                  <span className="text-xs font-medium">TW</span>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                Modern Technologies Stack
              </span>
            </div>
          </div>
          
          {/* Right content - floating cards */}
          <div className="md:w-1/2 relative h-[400px] md:h-[500px] reveal">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="relative w-full h-full">
                <div className="absolute top-0 right-0 glass-card p-6 w-64 animate-float">
                  <Code className="text-primary mb-3" size={24} />
                  <h3 className="text-lg font-semibold mb-2">Frontend Development</h3>
                  <p className="text-sm text-muted-foreground">
                    Beautiful and responsive user interfaces with modern frameworks
                  </p>
                </div>
                
                <div className="absolute bottom-0 left-0 glass-card p-6 w-64 animate-float delay-150">
                  <Server className="text-primary mb-3" size={24} />
                  <h3 className="text-lg font-semibold mb-2">Backend Development</h3>
                  <p className="text-sm text-muted-foreground">
                    Robust and scalable API development for your applications
                  </p>
                </div>
                
                <div className="absolute top-1/3 left-1/4 glass-card p-6 w-64 animate-float delay-300">
                  <Database className="text-primary mb-3" size={24} />
                  <h3 className="text-lg font-semibold mb-2">Database Solutions</h3>
                  <p className="text-sm text-muted-foreground">
                    Optimized database architecture for performance and security
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
