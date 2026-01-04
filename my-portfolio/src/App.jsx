import React, { useState, useRef } from 'react';
// The error happened because this import line was missing or incomplete:
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, Linkedin, Mail, ChevronDown, Cpu, Shield,
  Activity, Terminal, Database, Monitor, Smartphone,
  Award, BookOpen, ArrowUpRight, Menu, X, MapPin,
  Layout, Code2, Palette, Layers, Globe
} from 'lucide-react';

// --- Components ---

const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-800 text-neutral-300 border border-neutral-700 ${className}`}>
    {children}
  </span>
);

const Card = ({ children, className = "", title, icon: Icon, subtitle, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`group relative overflow-hidden rounded-3xl bg-neutral-900/50 border border-neutral-800 p-6 hover:border-neutral-700 transition-colors duration-300 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 h-full flex flex-col">
        {(title || Icon) && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {Icon && (
                <div className="p-2 rounded-xl bg-neutral-800 text-neutral-300 group-hover:text-white transition-colors">
                  <Icon size={18} />
                </div>
              )}
              <div>
                {title && <h3 className="text-lg font-semibold text-neutral-100">{title}</h3>}
                {subtitle && <p className="text-sm text-neutral-500">{subtitle}</p>}
              </div>
            </div>
          </div>
        )}
        {children}
      </div>
    </motion.div>
  );
};

const SectionHeading = ({ children, id }) => (
  <motion.h2
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    id={id}
    className="text-3xl font-bold text-white mb-8 tracking-tight flex items-center gap-3"
  >
    {children}
  </motion.h2>
);

const SocialLink = ({ href, icon: Icon, label }) => (
  <motion.a
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center p-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors duration-300"
    aria-label={label}
  >
    <Icon size={20} />
  </motion.a>
);

// --- Main App Component ---

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Smooth scroll
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  // Nav items
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
      
      {/* Background Noise/Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-neutral-800/50 bg-neutral-950/80"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo('home')} className="text-xl font-bold tracking-tighter text-white hover:text-neutral-300 transition-colors">
            JOSHIN<span className="text-blue-500">.</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-sm font-medium transition-colors hover:text-white ${activeSection === item.id ? 'text-white' : 'text-neutral-500'}`}
              >
                {item.label}
              </button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('contact')}
              className="px-4 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-neutral-200 transition-colors"
            >
              Contact Me
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-neutral-400 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-neutral-900 border-b border-neutral-800"
            >
              <div className="p-6 flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="text-left text-lg font-medium text-neutral-300 hover:text-white"
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => scrollTo('contact')}
                  className="mt-4 w-full py-3 bg-white text-black rounded-xl text-center font-bold hover:bg-neutral-200"
                >
                  Contact Me
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 space-y-32">
        
        {/* Hero Section */}
        <section id="home" className="flex flex-col md:flex-row gap-12 items-center justify-between min-h-[70vh]">
          <div className="flex-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Available for work
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]"
            >
              
      
              Joshin K Saju.
             
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-neutral-400 max-w-lg leading-relaxed"
            >
              I'm <strong className="text-white">Software Engineer, Web Developer & UI/UX Designer </strong>crafting efficient, user-centric applications.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4"
            >
              <SocialLink href="https://github.com/Joshinx17" icon={Github} label="GitHub" />
              <SocialLink href="https://linkedin.com/in/joshinsaju/" icon={Linkedin} label="LinkedIn" />
              <SocialLink href="mailto:2022432607.joshin@ug.sharda.ac.in" icon={Mail} label="Email" />
            </motion.div>
          </div>
          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex-1 flex justify-center items-center"
          >
             <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-neutral-800 shadow-2xl bg-neutral-900">
               {/* Using GitHub avatar as it's reliable for developer portfolios. 
                   If this image doesn't load, you can replace the src with your local image path. */}
               <img 
                 src="https://github.com/Joshinx17.png" 
                 alt="Joshin K Saju" 
                 className="w-full h-full object-cover"
               />
             </div>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience">
          <SectionHeading>Experience</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <Card title="Front-End Designer & Dev" subtitle="May 2025 - July 2025" icon={Layout} className="col-span-1 md:col-span-2" delay={0.1}>
              <div className="flex flex-col md:flex-row justify-between md:items-start mb-4">
                 <div>
                   <h4 className="text-xl font-bold text-white">SK Info Techies</h4>
                   <p className="text-neutral-400 text-sm">Hybrid</p>
                 </div>
              </div>
              <ul className="space-y-3 text-neutral-400 text-sm leading-relaxed">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0"></span>
                  Designed and developed landing pages for 5+ websites using HTML, CSS, JS, Bootstrap, and Tailwind.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0"></span>
                  Migrated large volumes of legacy content ensuring 100% data accuracy within a 5-member team.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0"></span>
                  Automated workflows using Gemini AI Studio, improving efficiency by 50%.
                </li>
              </ul>
            </Card>

            <Card title="Python App Dev & UI/UX" subtitle="June 2024" icon={Smartphone} delay={0.2}>
               <h4 className="text-lg font-bold text-white mb-2">OneThe416 Pvt. Ltd.</h4>
               <ul className="space-y-3 text-neutral-400 text-sm leading-relaxed">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500 shrink-0"></span>
                  Developed GUI for Python apps using Figma, Tkinter, and CustomTkinter.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500 shrink-0"></span>
                  Created comprehensive technical documentation for maintainability.
                </li>
              </ul>
            </Card>

            <Card title="Education" subtitle="2022 - Present" icon={BookOpen} delay={0.3}>
               <div className="space-y-4">
                 <div>
                    <h4 className="text-lg font-bold text-white">Sharda University</h4>
                    <p className="text-neutral-400 text-sm">B.Tech in Information Technology</p>
                    <p className="text-neutral-500 text-xs mt-1">CGPA: 8.2</p>
                 </div>
                 <hr className="border-neutral-800"/>
                 <div>
                    <h4 className="text-lg font-bold text-white">St. Gregorios School</h4>
                    <p className="text-neutral-400 text-sm">Class X & XII</p>
                    <p className="text-neutral-500 text-xs mt-1">Dwarka, New Delhi</p>
                 </div>
               </div>
            </Card>
          </div>
        </section>

        {/* Projects Section - Bento Grid Style */}
        <section id="projects">
          <SectionHeading>Featured Projects</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
            
            {/* Project 1 - Large */}
            <Card className="md:col-span-2" delay={0.1}>
               <div className="absolute top-0 right-0 p-8 opacity-50 group-hover:opacity-100 transition-opacity">
                 <ArrowUpRight size={32} className="text-white"/>
               </div>
               <div className="h-full flex flex-col justify-between z-10 relative">
                 <div className="mb-8">
                   <div className="h-12 w-12 bg-blue-600/20 text-blue-500 rounded-xl flex items-center justify-center mb-6">
                      <Monitor size={24} />
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-2">Desktop Voice Assistant</h3>
                   <p className="text-neutral-400 max-w-md">
                     An AI-powered desktop assistant with voice/text commands for Wikipedia, weather, news, and email. Integrated OpenAI API for natural language processing.
                   </p>
                 </div>
                 <div className="flex flex-wrap gap-2">
                   <Badge>Python</Badge>
                   <Badge>CustomTkinter</Badge>
                   <Badge>OpenAI API</Badge>
                   <Badge>SQLite</Badge>
                 </div>
               </div>
            </Card>

            {/* Project 2 */}
            <Card className="md:col-span-1" delay={0.2}>
               <div className="h-full flex flex-col justify-between">
                 <div>
                   <div className="h-12 w-12 bg-green-600/20 text-green-500 rounded-xl flex items-center justify-center mb-6">
                      <Activity size={24} />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2">Diabetic Foot Ulcer Detection</h3>
                   <p className="text-neutral-400 text-sm">
                     CNN model to classify and detect ulcers with 95% accuracy using TensorFlow & OpenCV.
                   </p>
                 </div>
                 <div className="flex flex-wrap gap-2 mt-4">
                   <Badge>TensorFlow</Badge>
                   <Badge>OpenCV</Badge>
                   <Badge>Python</Badge>
                 </div>
               </div>
            </Card>

            {/* Project 3 */}
            <Card className="md:col-span-3" delay={0.3}>
               <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                 <div className="flex-1">
                   <div className="flex items-center gap-4 mb-4">
                     <div className="h-12 w-12 bg-purple-600/20 text-purple-500 rounded-xl flex items-center justify-center">
                        <Globe size={24} />
                     </div>
                     <h3 className="text-2xl font-bold text-white">AIMS Portal</h3>
                   </div>
                   <p className="text-neutral-400 mb-6">
                     Airport Information Management System. A responsive portal with dashboards for traffic data, invoicing, and safety. Implemented modern UI/UX with responsive layouts.
                   </p>
                   <div className="flex flex-wrap gap-2">
                     <Badge>HTML5</Badge>
                     <Badge>Bootstrap</Badge>
                     <Badge>JavaScript</Badge>
                     <Badge>CSS3</Badge>
                   </div>
                 </div>
                 {/* Visual decoration for the project */}
                 <div className="hidden md:block w-64 h-32 rounded-lg bg-neutral-800 border border-neutral-700 relative overflow-hidden">
                    <div className="absolute top-4 left-4 right-4 h-2 bg-neutral-700 rounded-full"></div>
                    <div className="absolute top-10 left-4 w-1/2 h-2 bg-neutral-700 rounded-full"></div>
                    <div className="absolute bottom-4 right-4 h-8 w-8 bg-purple-500 rounded-full opacity-20"></div>
                 </div>
               </div>
            </Card>

          </div>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <SectionHeading>Skills & Tools</SectionHeading>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {/* Programming */}
             <Card title="Languages" icon={Terminal} className="col-span-2" delay={0.1}>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['Python', 'Java', 'JavaScript', 'C', 'Kotlin', 'SQL', 'Markdown'].map(skill => (
                    <Badge key={skill} className="bg-neutral-800 border-neutral-700 text-neutral-300">{skill}</Badge>
                  ))}
                </div>
             </Card>

             {/* Web Tech */}
             <Card title="Web" icon={Code2} className="col-span-2" delay={0.2}>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['ReactJS', 'NodeJS', 'Tailwind', 'Bootstrap', 'HTML5', 'CSS3'].map(skill => (
                    <Badge key={skill} className="bg-neutral-800 border-neutral-700 text-neutral-300">{skill}</Badge>
                  ))}
                </div>
             </Card>

             {/* Tools */}
             <Card title="Tools & Design" icon={Palette} className="col-span-2 md:col-span-3" delay={0.3}>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['Git/GitHub', 'VS Code', 'Figma', 'Android Studio', 'Power BI', 'Adobe Photoshop', 'Canva', 'DaVinci Resolve'].map(skill => (
                    <Badge key={skill} className="bg-neutral-800 border-neutral-700 text-neutral-300">{skill}</Badge>
                  ))}
                </div>
             </Card>

             {/* Certifications */}
             <Card title="Certs" icon={Award} className="col-span-2 md:col-span-1 bg-gradient-to-br from-neutral-800 to-neutral-900 border-neutral-700" delay={0.4}>
                <ul className="text-xs text-neutral-400 space-y-2 mt-4">
                  <li>• Machine Learning A-Z</li>
                  <li>• Web Dev Bootcamp</li>
                  <li>• Cloud IoT Edge ML</li>
                </ul>
             </Card>
          </div>
        </section>

        {/* Contact Section */}
<section id="contact">
  <SectionHeading>Contact</SectionHeading>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    
    {/* Left Card */}
    <Card title="Address Info" icon={MapPin} delay={0.1}>
      <div className="space-y-6 text-sm text-neutral-400">
        
        <div>
          <h5 className="text-white font-semibold mb-1">Email</h5>
          <p>
            <a
              href="mailto:joshinkoshys@gmail.com"
              className="hover:text-white transition-colors"
            >
              joshinkoshys@gmail.com
            </a>
          </p>
          <p>
            <a
              href="mailto:2022432607.joshin@ug.sharda.ac.in"
              className="hover:text-white transition-colors"
            >
              2022432607.joshin@ug.sharda.ac.in
            </a>
          </p>
        </div>

        <div>
          <h5 className="text-white font-semibold mb-1">Phone</h5>
          <p>+91 966 797 2091</p>
        </div>

        <div>
          <h5 className="text-white font-semibold mb-1">Address</h5>
          <p>Hari Nagar, Mayapuri</p>
          <p>South-West Delhi, New Delhi – 110064</p>
        </div>
      </div>
    </Card>

    {/* Right Card */}
    <Card title="Get In Touch" icon={Mail} delay={0.2}>
      <form
        action="https://formspree.io/f/mvzgbdnp"
        method="POST"
        className="space-y-4"
      >
        <input
          type="text"
          name="Name"
          placeholder="Your Name"
          required
          className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-blue-500"
        />

        <input
          type="email"
          name="_replyto"
          placeholder="Your Email"
          required
          className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-blue-500"
        />

        <input
          type="text"
          name="Phone"
          placeholder="Phone Number"
          required
          className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-blue-500"
        />

        <textarea
          name="message"
          placeholder="Your Message..."
          rows="4"
          required
          className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-blue-500"
        ></textarea>

        <button
          type="submit"
          className="w-full py-3 bg-white text-black rounded-xl font-bold hover:bg-neutral-200 transition-colors"
        >
          Send Message
        </button>
      </form>
    </Card>

  </div>
</section>



        {/* Footer */}
        <footer className="pt-20 border-t border-neutral-900 text-center">
          <p className="text-neutral-500 text-sm mb-4">
            Designed & Built by Joshin K Saju
          </p>
          <div className="flex justify-center gap-6 text-neutral-600">
            <a href="https://linkedin.com/in/joshinsaju/" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://github.com/Joshinx17" className="hover:text-white transition-colors">GitHub</a>
            <a href="mailto:2022432607.joshin@ug.sharda.ac.in" className="hover:text-white transition-colors">Email</a>
          </div>
        </footer>

      </main>
    </div>
  );
}