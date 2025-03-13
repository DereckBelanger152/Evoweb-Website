import React, { useState, useEffect } from "react";
import {
  Code2,
  Sparkles,
  Laptop,
  Users,
  ChevronDown,
  ExternalLink,
  Github,
  Rocket,
  Palette,
  Globe,
  Sun,
  Moon,
  GraduationCap,
  Coffee,
  Heart,
} from "lucide-react";
import { useTheme } from "./ThemeContext";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["accueil", "apropos", "services", "projets", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isHoveringHero) {
        setMousePosition({
          x: (e.clientX - window.innerWidth / 2) * 0.05,
          y: (e.clientY - window.innerHeight / 2) * 0.05,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHoveringHero]);

  const projects = [
    {
      title: "Boutique à Café",
      description: "Un prototype de site web pour une boutique de café fictive",
      image: "/cafe_presentation.png",
      tech: ["React", "Tailwind", "Framer Motion"],
      link: "#",
    },
    {
      title: "Club IA Université Laval",
      description: "Site pour un club étudiant en intelligence artificielle",
      image: "/cia_presentation.png",
      tech: ["React", "TypeScript", "Supabase"],
      link: "#",
    },
    {
      title: "Site personnel",
      description: "Site portfolio pour afficher mes projets et compétences",
      image: "portfolio_presentation.png",
      tech: ["React", "D3.js", "TailwindCSS"],
      link: "#",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled ? "glass-card shadow-lg py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2 group">
            <Code2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400 animate-rotate" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 text-transparent bg-clip-text animate-gradient">
              EvoWeb
            </span>
          </div>
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex space-x-8">
              {[
                ["accueil", "Accueil"],
                ["apropos", "À Propos"],
                ["services", "Services"],
                ["projets", "Projets"],
                ["contact", "Contact"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`relative px-4 py-2 ${
                    activeSection === id
                      ? "text-indigo-600 dark:text-indigo-400 text-glow"
                      : "text-gray-600 dark:text-gray-300"
                  } hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors`}
                >
                  {label}
                  {activeSection === id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 transform origin-left animate-[width_0.3s_ease-out]" />
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg glass-card hover-glow"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="accueil"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        onMouseEnter={() => setIsHoveringHero(true)}
        onMouseLeave={() => setIsHoveringHero(false)}
      >
        <div
          className="absolute inset-0 chaos-grid dark:chaos-grid-dark opacity-30"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
        <div className="container mx-auto px-6 py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 text-transparent bg-clip-text animate-gradient text-glow">
              Je Donne Vie à Vos Projets Web
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Je transforme vos idées en sites web modernes et performants qui
              correspondent à vos besoins
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => scrollToSection("projets")}
                className="group glass-card text-indigo-600 dark:text-indigo-400 px-8 py-3 rounded-lg hover-glow animate-pulse-glow"
              >
                <span className="flex items-center justify-center">
                  Voir Mes Projets
                  <Rocket className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="group gradient-border dark:gradient-border-dark rounded-lg px-8 py-3 hover-glow"
              >
                <span className="flex items-center justify-center">
                  Me Contacter
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ChevronDown
            className="h-8 w-8 text-indigo-400 animate-bounce cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
            onClick={() => scrollToSection("apropos")}
          />
        </div>
      </section>

      {/* À Propos Section */}
      <section id="apropos" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 chaos-grid dark:chaos-grid-dark opacity-20 rotate-45" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                  <img
                    src="profil.HEIC"
                    alt="Dereck"
                    className="relative rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="flex items-center space-x-3">
                  <GraduationCap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-2xl font-semibold text-glow">
                    Étudiant Passionné
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Je suis Dereck, étudiant en informatique et développeur web
                  passionné. Je combine créativité et expertise technique pour
                  créer des expériences web uniques.
                </p>
                <div className="flex items-center space-x-3">
                  <Coffee className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  <p className="text-gray-600 dark:text-gray-300">
                    Amateur de nouveaux défis et d'apprentissage continu
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  <p className="text-gray-600 dark:text-gray-300">
                    Spécialisé dans le développement React et les technologies
                    modernes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-32">
        <div className="absolute inset-0 chaos-grid dark:chaos-grid-dark opacity-20 -rotate-45" />
        <div className="container mx-auto px-6 relative">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text text-glow">
            Nos Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Laptop className="h-8 w-8" />,
                title: "Développement Web",
                description:
                  "Sites web personnalisés avec les technologies modernes",
              },
              {
                icon: <Palette className="h-8 w-8" />,
                title: "Design UI/UX",
                description: "Expériences utilisateur belles et intuitives",
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Consultation",
                description:
                  "Conseils d'experts pour votre stratégie numérique",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group glass-card rounded-xl p-8 hover-glow transform hover:-translate-y-2 transition-all duration-500"
              >
                <div className="text-indigo-600 dark:text-indigo-400 mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projets" className="relative py-32">
        <div className="absolute inset-0 chaos-grid dark:chaos-grid-dark opacity-20" />
        <div className="container mx-auto px-6 relative">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text text-glow">
            Mes Projets
          </h2>
          <div className="flex flex-col gap-24 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center gap-12"
                style={{
                  flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                }}
              >
                <div className="w-full md:w-1/2">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                    <div className="relative glass-card rounded-xl overflow-hidden hover-glow">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full aspect-video object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 space-y-6">
                  <h3 className="text-2xl font-semibold text-glow">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 glass-card text-indigo-600 dark:text-indigo-400 rounded-full text-sm hover-glow"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 group"
                  >
                    Voir le Projet
                    <ExternalLink className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32">
        <div className="absolute inset-0 chaos-grid dark:chaos-grid-dark opacity-20" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto glass-card rounded-2xl p-12 hover-glow">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="w-full md:w-1/2 space-y-8">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text text-glow">
                  Travaillons Ensemble
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Prêt à démarrer votre prochain projet ? Contactez-nous pour
                  donner vie à vos idées !
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                    <Globe className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    <span>
                      Disponible pour des projets dans le monde entier
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                    <Coffee className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    <span>Toujours partant pour un café et une discussion</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <form className="space-y-6">
                  <div className="group">
                    <input
                      type="text"
                      placeholder="Votre Nom"
                      className="w-full px-4 py-3 rounded-lg glass-card border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition-all duration-300 hover-glow"
                    />
                  </div>
                  <div className="group">
                    <input
                      type="email"
                      placeholder="Votre Email"
                      className="w-full px-4 py-3 rounded-lg glass-card border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition-all duration-300 hover-glow"
                    />
                  </div>
                  <div className="group">
                    <textarea
                      placeholder="Votre Message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg glass-card border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition-all duration-300 hover-glow"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full group gradient-border dark:gradient-border-dark rounded-lg px-8 py-3 hover-glow"
                  >
                    <span className="flex items-center justify-center">
                      Envoyer le Message
                      <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gray-900 dark:bg-gray-950 text-white py-12">
        <div className="absolute inset-0 chaos-grid dark:chaos-grid-dark opacity-10" />
        <div className="container mx-auto px-6 relative">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 group">
              <Code2 className="h-8 w-8 text-indigo-400 animate-rotate" />
              <span className="text-xl font-bold">EvoWeb</span>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="hover:text-indigo-400 transition-colors transform hover:scale-110"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="hover:text-indigo-400 transition-colors transform hover:scale-110"
              >
                <ExternalLink className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            © {new Date().getFullYear()} EvoWeb. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
