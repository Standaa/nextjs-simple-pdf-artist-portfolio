"use client";

import { useState } from "react";
import { sendEmail } from "../actions";
import Link from "next/link";

type FormState = {
  submitted: boolean;
  error: string | null;
  loading: boolean;
};

export default function Contact() {
  const [formState, setFormState] = useState<FormState>({
    submitted: false,
    error: null,
    loading: false,
  });

  async function handleSubmit(formData: FormData) {
    setFormState({ submitted: false, error: null, loading: true });

    try {
      const result = await sendEmail(formData);

      if (result.error) {
        setFormState({ submitted: false, error: result.error, loading: false });
        return;
      }

      setFormState({ submitted: true, error: null, loading: false });
      // Reset the form
      const form = document.getElementById("contact-form") as HTMLFormElement;
      form.reset();
    } catch (error) {
      setFormState({
        submitted: false,
        error: "An error occurred while sending your message",
        loading: false,
      });
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto pt-10 px-4">
        <div className="mb-16">
          <Link href="/" className="text-black hover:text-gray-600 text-xl">
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-5xl text-black mb-8 text-center">
          Contact Iseult Perrault
        </h1>

        {formState.submitted ? (
          <div className="text-center py-8">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">
              Thank you for your message!
            </h2>
            <p className="mb-6 text-green-800">
              Your message has been sent successfully. I&apos;ll get back to you
              as soon as possible.
            </p>
          </div>
        ) : (
          <form id="contact-form" action={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 bg-white border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 bg-white border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-2 bg-white border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
              ></textarea>
            </div>

            {formState.error && (
              <div className="text-red-600 font-medium">{formState.error}</div>
            )}

            <button
              type="submit"
              disabled={formState.loading}
              className={`w-full bg-black text-white py-3 rounded-md font-medium 
              ${
                formState.loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-gray-800"
              } 
              transition-colors`}
            >
              {formState.loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
