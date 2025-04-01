import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ExternalLink } from "lucide-react";

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    const serviceId = import.meta.env.VITE_REACT_APP_EMAILJS_SERVICE_ID;
    const templateIdForMessage = import.meta.env
      .VITE_REACT_APP_EMAILJS_TEMPLATE_ID_FOR_MESSAGE;
    const templateIdForReply = import.meta.env
      .VITE_REACT_APP_EMAILJS_TEMPLATE_ID_FOR_REPLY;
    const publicKey = import.meta.env.VITE_REACT_APP_EMAILJS_PUBLIC_KEY;

    if (
      !serviceId ||
      !templateIdForMessage ||
      !templateIdForReply ||
      !publicKey
    ) {
      setStatus("error");
      console.error("Environment variables are not defined!");
      return;
    }

    try {
      // Send the form message to your email (Template for receiving the message)
      await emailjs.sendForm(
        serviceId,
        templateIdForMessage,
        form.current,
        publicKey
      );

      // Send the auto-reply to the client (Template for auto-reply)
      await emailjs.sendForm(
        serviceId,
        templateIdForReply,
        form.current,
        publicKey
      );

      setStatus("success");
      form.current.reset();
    } catch (error) {
      setStatus("error");
      console.error("Error sending email:", error);
    }
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
      {status === "success" && (
        <p className="text-green-500 mt-4">
          Message envoyé avec succès, merci pour votre confiance!
        </p>
      )}
      {status === "error" && (
        <p className="text-red-500 mt-4">
          Une erreur est survenue. Veuillez réessayer.
        </p>
      )}
    </form>
  );
};

export default ContactForm;
