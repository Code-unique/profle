import { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import TerminalInterface from "@/components/shared/TerminalInterface";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate sending a message
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
        variant: "default",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-5xl font-heading font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Get In <span className="text-neon-green">Touch</span>
        </motion.h2>
        
        <motion.p 
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Have a project in mind or want to chat about web development? Feel free to reach out through the form below or connect with me directly.
        </motion.p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Form */}
          <motion.div 
            className="bg-card p-8 rounded-xl border border-accent/30 hover:border-accent/60 transition-all duration-300"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-heading font-semibold mb-6 text-neon-green">Send a Message</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="name" className="block mb-2 text-sm font-medium">Your Name</Label>
                <Input 
                  type="text" 
                  id="name" 
                  name="name"
                  className="w-full px-4 py-3 rounded-md bg-background border border-accent/30 focus:border-accent focus:outline-none text-foreground placeholder-muted-foreground"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-4">
                <Label htmlFor="email" className="block mb-2 text-sm font-medium">Your Email</Label>
                <Input 
                  type="email" 
                  id="email" 
                  name="email"
                  className="w-full px-4 py-3 rounded-md bg-background border border-accent/30 focus:border-accent focus:outline-none text-foreground placeholder-muted-foreground"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-4">
                <Label htmlFor="subject" className="block mb-2 text-sm font-medium">Subject</Label>
                <Input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  className="w-full px-4 py-3 rounded-md bg-background border border-accent/30 focus:border-accent focus:outline-none text-foreground placeholder-muted-foreground"
                  placeholder="Project Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              
              <div className="mb-6">
                <Label htmlFor="message" className="block mb-2 text-sm font-medium">Message</Label>
                <Textarea 
                  id="message" 
                  name="message"
                  rows={5} 
                  className="w-full px-4 py-3 rounded-md bg-background border border-accent/30 focus:border-accent focus:outline-none text-foreground placeholder-muted-foreground"
                  placeholder="Tell me about your project or inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="neon-btn w-full px-6 py-3 rounded-md bg-background border border-accent text-accent hover:bg-accent/10 transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-accent border-t-transparent animate-spin mr-2"></span>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div 
            className="flex flex-col justify-between"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="text-xl font-heading font-semibold mb-6 text-neon-cyan">Connect Directly</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <a href="mailto:hello@uniqueadhikari.dev" className="text-muted-foreground hover:text-primary transition-colors duration-300">uniqueadhikari25@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-secondary/10 text-secondary mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">WhatsApp</h4>
                    <a href="https://wa.me/9862340551" className="text-muted-foreground hover:text-secondary transition-colors duration-300">+977 9862340551</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-accent/10 text-accent mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">GitHub</h4>
                    <a href="https://github.com/code-unique" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent transition-colors duration-300">github.com/code-unique</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">LinkedIn</h4>
                    <a href="https://linked.com/uniqueadhikari" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">linked.com/uniqueadhikari</a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Terminal */}
            <motion.div 
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <TerminalInterface 
                initialCommand="whoami"
                commandResponses={{
                  whoami: "Unique Adhikari - Full Stack Developer",
                  contact: "WhatsApp: +1 234 567 890\nEmail: hello@uniqueadhikari.dev",
                  help: "Available commands:\n- whoami: Learn about Unique\n- contact: How to reach me\n- projects: List featured projects\n- skills: Show technical skills",
                  projects: "Check out my projects section for my featured work!",
                  skills: "JavaScript, TypeScript, React, Node.js, Next.js, and more!"
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}