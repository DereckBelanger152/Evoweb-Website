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
      title: "Portfolio personnel",
      description: "Un site vitrine moderne pour présenter mes projets",
      image:
        "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800",
      tech: ["React", "Tailwind", "Framer Motion"],
      link: "#",
    },
    {
      title: "Club IA de l'Université Laval",
      description: "Un site qui présente les activités du club IA",
      image:
        "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=800",
      tech: ["React", "TypeScript", "Supabase"],
      link: "#",
    },
    {
      title: "À venir...",
      description: "",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      tech: ["", "", ""],
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
          isScrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2 group">
            <Code2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400 transform group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
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
                      ? "text-indigo-600 dark:text-indigo-400"
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
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
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
        className="pt-32 pb-20 px-6 relative overflow-hidden"
        onMouseEnter={() => setIsHoveringHero(true)}
        onMouseLeave={() => setIsHoveringHero(false)}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, ${
              isDark ? "#6366f1" : "indigo"
            } 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
        <div className="container mx-auto text-center relative">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 text-transparent bg-clip-text animate-gradient">
            Donnez vie à vos projets Web
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Je créer des sites web 100% personnalisés pour répondre à vos
            besoins. Vous avez une idée ? Je m'occupe du reste !
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => scrollToSection("projets")}
              className="group bg-indigo-600 dark:bg-indigo-500 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center">
                Voir Mes Projets
                <Rocket className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="group border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 px-8 py-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center">
                Me Contacter
                <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
          <div className="mt-16">
            <ChevronDown
              className="h-8 w-8 text-indigo-400 animate-bounce mx-auto cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
              onClick={() => scrollToSection("apropos")}
            />
          </div>
        </div>
      </section>

      {/* À Propos Section */}
      <section
        id="apropos"
        className="py-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg px-6"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
            À Propos de Moi
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <img
                  src="/public/profil.HEIC"
                  alt="Dereck"
                  className="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="flex items-center space-x-3">
                  <GraduationCap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-2xl font-semibold">Étudiant Passionné</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Je suis Dereck, étudiant en informatique et développeur web
                  passionné. Je profite de mon temps libre pour créer des sites
                  afin de mettre en pratique mes compétences et d'aider les
                  autres à réaliser leurs projets.
                </p>
                <div className="flex items-center space-x-3">
                  <Coffee className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  <p className="text-gray-600 dark:text-gray-300">
                    Adore apprendre les nouvelles technologies et les
                    implémenter dans mes projets
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  <p className="text-gray-600 dark:text-gray-300">
                    Spécialisé dans le développement React, TailwindCSS et
                    JavaScript
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg px-6"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
            Mes Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Laptop className="h-8 w-8" />,
                title: "Développement Web",
                description:
                  "Je crée des sites web personnalisés avec les technologies modernes",
              },
              {
                icon: <Palette className="h-8 w-8" />,
                title: "Design UI/UX",
                description:
                  "Je conçois des expériences utilisateur belles et intuitives",
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Consultation",
                description: "Je vous conseille sur votre stratégie numérique",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group p-8 rounded-xl bg-white dark:bg-gray-800 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl"
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
      <section id="projets" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
            Mes Projets
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-200 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/20 rounded-full text-sm text-white backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    className="inline-flex items-center text-white hover:text-indigo-200 group"
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
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 px-6"
      >
        <div className="container mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-8">Travaillons Ensemble</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Vous avez un projet en tête ? Je suis là pour vous aider à le
            réaliser !
          </p>
          <form className="max-w-lg mx-auto">
            <div className="grid gap-6">
              <div className="group">
                <input
                  type="text"
                  placeholder="Votre Nom"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300 transform group-hover:scale-[1.02]"
                />
              </div>
              <div className="group">
                <input
                  type="email"
                  placeholder="Votre Email"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300 transform group-hover:scale-[1.02]"
                />
              </div>
              <div className="group">
                <textarea
                  placeholder="Votre Message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300 transform group-hover:scale-[1.02]"
                ></textarea>
              </div>
              <button
                type="submit"
                className="group bg-white text-indigo-600 dark:text-indigo-500 px-8 py-3 rounded-lg hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center justify-center">
                  Envoyer le Message
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 group">
              <Code2 className="h-8 w-8 text-indigo-400 transform group-hover:rotate-180 transition-transform duration-500" />
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
