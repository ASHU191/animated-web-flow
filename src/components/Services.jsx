
import { useState, useEffect } from "react";
import { Code, Server, Database, Globe, Monitor, Smartphone, Cpu, Settings, Zap } from "lucide-react";

const servicesData = [
  {
    id: 1,
    icon: <Code />,
    title: "Web Development",
    description: "We create custom websites and web applications using the latest technologies and frameworks like React, Angular, and Vue.js.",
  },
  {
    id: 2,
    icon: <Server />,
    title: "Backend Development",
    description: "Build robust and scalable backend systems using Node.js, Express, Python, Django, and other modern server-side technologies.",
  },
  {
    id: 3,
    icon: <Database />,
    title: "Database Solutions",
    description: "Design and implement efficient database architectures with SQL and NoSQL databases like MongoDB, PostgreSQL, and MySQL.",
  },
  {
    id: 4,
    icon: <Globe />,
    title: "API Development",
    description: "Create RESTful and GraphQL APIs that enable seamless communication between your frontend and backend systems.",
  },
  {
    id: 5,
    icon: <Monitor />,
    title: "UI/UX Design",
    description: "Design intuitive and engaging user interfaces that provide exceptional user experiences across all devices.",
  },
  {
    id: 6,
    icon: <Smartphone />,
    title: "Responsive Design",
    description: "Ensure your web applications look and function perfectly on all devices, from desktops to smartphones.",
  },
  {
    id: 7,
    icon: <Cpu />,
    title: "Performance Optimization",
    description: "Improve the speed and efficiency of your web applications for better user experience and SEO performance.",
  },
  {
    id: 8,
    icon: <Settings />,
    title: "Maintenance & Support",
    description: "Provide ongoing maintenance and support to ensure your applications remain secure, up-to-date, and bug-free.",
  },
  {
    id: 9,
    icon: <Zap />,
    title: "Custom Solutions",
    description: "Develop tailored solutions that address your specific business challenges and requirements.",
  },
];

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    const section = document.getElementById("services");
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="services" className="py-24 bg-secondary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 reveal">
          <span className="px-4 py-1 text-xs font-semibold tracking-wider bg-primary/10 border border-primary/20 rounded-full text-primary">
            OUR SERVICES
          </span>
          <h2 className="section-title mt-4">What We Offer</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
            We provide comprehensive web development solutions tailored to meet your business needs, with a focus on creating modern, efficient, and scalable applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div 
              key={service.id}
              className={`card hover:translate-y-[-5px] reveal ${isVisible ? 'active' : ''}`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
