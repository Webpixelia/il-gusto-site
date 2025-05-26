'use client';
import { useState } from 'react';
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Remplacez par votre endpoint Formspree ou API Route
      const response = await fetch('https://formspree.io/f/xpwdrpyy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          telephone: '',
          sujet: '',
          message: ''
        });
      } else {
        alert("Une erreur s'est produite lors de l'envoi du message");
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-6 bg-green-100 text-green-800 rounded-lg">
        <p>✅ Message envoyé avec succès ! Nous vous répondrons dès que possible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nom">Nom</Label>
          <Input
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Votre nom"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prenom">Prénom</Label>
          <Input
            id="prenom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Votre prénom"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="votre@email.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="telephone">Téléphone</Label>
        <Input
          id="telephone"
          type="tel"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          placeholder="Votre numéro de téléphone"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sujet">Sujet</Label>
        <Input
          id="sujet"
          name="sujet"
          value={formData.sujet}
          onChange={handleChange}
          placeholder="Sujet de votre message"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Votre message"
          rows={5}
          required
        />
      </div>

      <div className="flex justify-end">
        <Button 
          type="submit" 
          className="bg-[#4a8063] hover:bg-[#3a6a53] text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Envoi en cours...
            </span>
          ) : (
            <span className="flex items-center">
              <Send className="w-4 h-4 mr-2" />
              Envoyer
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}