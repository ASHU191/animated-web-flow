
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    const section = document.getElementById("contact");
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      
      // Reset submission state after a delay
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 reveal">
          <span className="px-4 py-1 text-xs font-semibold tracking-wider bg-primary/10 border border-primary/20 rounded-full text-primary">
            GET IN TOUCH
          </span>
          <h2 className="section-title mt-4">Contact Us</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
            Have a project in mind or need consulting services? Reach out to us and let's discuss how we can help your business grow.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`card p-8 reveal ${isVisible ? 'active' : ''}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="johndoe@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="+1 (123) 456-7890"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Project Inquiry"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  placeholder="Tell us about your project or inquiry..."
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="btn btn-primary w-full flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Message...
                  </span>
                ) : isSubmitted ? (
                  <span className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Message Sent!
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </span>
                )}
              </button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className={`space-y-8 reveal ${isVisible ? 'active' : ''}`} style={{ transitionDelay: '200ms' }}>
            <div className="card p-6 flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                <p className="text-muted-foreground mb-2">For general inquiries and information:</p>
                <a href="mailto:info@webelo.net" className="text-primary hover:underline">info@webelo.net</a>
                <p className="text-muted-foreground mt-2 mb-2">For project and business inquiries:</p>
                <a href="mailto:projects@webelo.net" className="text-primary hover:underline">projects@webelo.net</a>
              </div>
            </div>
            
            <div className="card p-6 flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                <p className="text-muted-foreground mb-2">Mon-Fri, 9:00 AM - 6:00 PM:</p>
                <a href="tel:+11234567890" className="text-primary hover:underline">+1 (123) 456-7890</a>
                <p className="text-muted-foreground mt-2 mb-2">International:</p>
                <a href="tel:+44987654321" className="text-primary hover:underline">+44 9876 543 21</a>
              </div>
            </div>
            
            <div className="card p-6 flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
                <p className="text-muted-foreground mb-2">Main Office:</p>
                <p className="text-foreground">1234 Tech Park, Suite 567<br />San Francisco, CA 94107<br />United States</p>
              </div>
            </div>
            
            <div className="card p-6 flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
                <p className="text-foreground mb-1"><span className="font-medium">Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
                <p className="text-foreground mb-1"><span className="font-medium">Saturday:</span> 10:00 AM - 2:00 PM</p>
                <p className="text-foreground"><span className="font-medium">Sunday:</span> Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
