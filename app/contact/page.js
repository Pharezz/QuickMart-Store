"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Form submitted:", form);

      // Show success toast
      toast.success("Your message was sent successfully!");

      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-2xl lg:max-w-3xl p-6 shadow rounded-2xl bg-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              placeholder="Name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg outline-indigo-500 px-3 py-3 text-sm sm:text-base"
            />
          </div>

          <div>
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg outline-indigo-500 border-gray-300 px-3 py-3 text-sm sm:text-base"
            />
          </div>

          <div>
            <textarea
              placeholder="Your message..."
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full border rounded-lg outline-indigo-500 border-gray-300 px-3 py-3 text-sm sm:text-base"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg cursor-pointer hover:bg-indigo-700 disabled:opacity-50 text-sm sm:text-base"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
