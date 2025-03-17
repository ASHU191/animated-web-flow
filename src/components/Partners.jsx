
import { useState, useEffect } from "react";

const partnersData = [
  {
    id: 1,
    name: "TechCorp",
    logo: "https://placehold.co/200x80/222/fff?text=TechCorp",
    description: "Leading provider of enterprise software solutions",
  },
  {
    id: 2,
    name: "InnovateSystems",
    logo: "https://placehold.co/200x80/222/fff?text=InnovateSystems",
    description: "Specializing in digital transformation and innovation",
  },
  {
    id: 3,
    name: "GlobalTech",
    logo: "https://placehold.co/200x80/222/fff?text=GlobalTech",
    description: "International technology and consulting partner",
  },
  {
    id: 4,
    name: "NextGen Solutions",
    logo: "https://placehold.co/200x80/222/fff?text=NextGen",
    description: "Advanced technology solutions for modern businesses",
  },
  {
    id: 5,
    name: "FutureBiz",
    logo: "https://placehold.co/200x80/222/fff?text=FutureBiz",
    description: "Forward-thinking business technology consultancy",
  },
  {
    id: 6,
    name: "SmartSoft",
    logo: "https://placehold.co/200x80/222/fff?text=SmartSoft",
    description: "Intelligent software solutions for complex problems",
  },
];

const testimonials = [
  {
    id: 1,
    text: "The team at Webelo delivered exceptional quality within our tight timeline. Their technical expertise and attention to detail transformed our concept into a robust platform that has received overwhelmingly positive user feedback.",
    author: "Sarah Johnson",
    position: "CTO, TechCorp",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    text: "Working with Webelo has been a game-changer for our business. Their proactive approach to problem-solving and ability to understand our unique requirements resulted in a solution that has streamlined our operations and increased revenue.",
    author: "Michael Chen",
    position: "CEO, InnovateSystems",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    text: "We've partnered with Webelo on multiple projects, and they consistently deliver outstanding results. Their technical knowledge combined with their business acumen makes them an invaluable partner for any digital initiative.",
    author: "Amanda Rodriguez",
    position: "Product Director, GlobalTech",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

const Partners = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    const section = document.getElementById("partners");
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="partners" className="py-24 bg-secondary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 reveal">
          <span className="px-4 py-1 text-xs font-semibold tracking-wider bg-primary/10 border border-primary/20 rounded-full text-primary">
            OUR PARTNERS
          </span>
          <h2 className="section-title mt-4">Trusted By Industry Leaders</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
            We collaborate with forward-thinking companies to create innovative web solutions that drive business growth and digital transformation.
          </p>
        </div>
        
        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-20">
          {partnersData.map((partner, index) => (
            <div 
              key={partner.id}
              className={`card flex items-center justify-center p-8 reveal ${isVisible ? 'active' : ''}`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                animationDelay: `${index * 100}ms`
              }}
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-w-full max-h-12 object-contain filter grayscale opacity-70 hover:filter-none hover:opacity-100 transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        
        {/* Testimonials */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-12 reveal">What Our Partners Say</h3>
          
          <div className="relative h-[300px] md:h-[250px]">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`absolute inset-0 flex flex-col md:flex-row items-center gap-8 card p-8 transition-all duration-500 ${
                  index === activeTestimonial 
                    ? "opacity-100 translate-x-0" 
                    : index < activeTestimonial 
                      ? "opacity-0 -translate-x-full" 
                      : "opacity-0 translate-x-full"
                }`}
              >
                <div className="flex-shrink-0">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full border-2 border-primary"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="text-foreground italic mb-4">{testimonial.text}</p>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeTestimonial ? "bg-primary w-6" : "bg-primary/30"
                }`}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`View testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
