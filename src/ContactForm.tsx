import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { ExternalLink } from "lucide-react";

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      alert("Erreur : Les variables d'environnement ne sont pas définies !");
      return;
    }

    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then(() => {
        alert("Message envoyé avec succès !");
        form.current?.reset();
      })
      .catch(() => {
        alert("Erreur lors de l'envoi du message.");
      });
  };

  return (
    <form ref={form} onSubmit={handleSubmit} className="space-y-6">
      <div className="group">
        <input
          type="text"
          name="name"
          placeholder="Votre Nom"
          required
          className="w-full px-4 py-3 rounded-lg glass-card border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition-all duration-300 hover-glow"
        />
      </div>
      <div className="group">
        <input
          type="email"
          name="email"
          placeholder="Votre Email"
          required
          className="w-full px-4 py-3 rounded-lg glass-card border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition-all duration-300 hover-glow"
        />
      </div>
      <div className="group">
        <textarea
          name="message"
          placeholder="Votre Message"
          rows={4}
          required
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
  );
};

export default ContactForm;
