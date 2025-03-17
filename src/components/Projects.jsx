
import { useState, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";

const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A fully-featured online store with product catalog, shopping cart, and secure checkout.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "CRM Application",
    description: "Customer relationship management system with lead tracking, communication history, and analytics.",
    tags: ["Vue.js", "Express", "PostgreSQL", "Chart.js"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Social Media Dashboard",
    description: "Integrated dashboard for managing multiple social media accounts and analyzing performance.",
    tags: ["React", "GraphQL", "Firebase", "D3.js"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Healthcare Portal",
    description: "Secure patient portal for appointment scheduling, medical records access, and communication.",
    tags: ["Angular", "Spring Boot", "MySQL", "WebSockets"],
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Real Estate Platform",
    description: "Property listing and search platform with map integration and virtual tours.",
    tags: ["Next.js", "Express", "MongoDB", "Mapbox"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Learning Management System",
    description: "Educational platform with course management, video streaming, and progress tracking.",
    tags: ["React", "Node.js", "PostgreSQL", "Socket.io"],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  }
];

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  
  const filters = ["All", "React", "Vue.js", "Angular", "Node.js", "MongoDB", "PostgreSQL"];
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    const section = document.getElementById("projects");
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);
  
  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(
        projectsData.filter(project => project.tags.includes(activeFilter))
      );
    }
  }, [activeFilter]);

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 reveal">
          <span className="px-4 py-1 text-xs font-semibold tracking-wider bg-primary/10 border border-primary/20 rounded-full text-primary">
            OUR PROJECTS
          </span>
          <h2 className="section-title mt-4">Recent Work</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
            Browse through our portfolio of successful projects that demonstrate our expertise and capabilities in web development.
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 reveal">
          {filters.map((filter, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-foreground hover:bg-secondary"
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`project-card reveal rounded-xl overflow-hidden ${isVisible ? 'active' : ''}`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                animationDelay: `${index * 100}ms`
              }}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-64 object-cover object-center transition-transform duration-700 hover:scale-110"
                loading="lazy"
              />
              <div className="project-card-content">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a href="#" className="btn btn-primary py-2 px-4 text-sm">
                    View Project <ExternalLink className="ml-1 h-3 w-3 inline-block" />
                  </a>
                  <a href="#" className="btn btn-outline py-2 px-4 text-sm">
                    <Github className="mr-1 h-3 w-3 inline-block" /> Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16 reveal">
          <a href="#contact" className="btn btn-primary">
            Discuss Your Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
