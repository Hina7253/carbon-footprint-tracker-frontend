import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-10">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-4xl"
      >

        <h1 className="text-3xl font-bold text-center text-green-600 mb-8">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Contact Info */}
          <div className="space-y-6">

            <div className="flex items-center gap-3">
              <Mail className="text-green-600" />
              <span>support@carbonscope.com</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-green-600" />
              <span>+91 98765 43210</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="text-green-600" />
              <span>India</span>
            </div>

          </div>

          {/* Contact Form */}
          <form className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>

            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
              Send Message
            </button>

          </form>

        </div>

      </motion.div>

    </div>
  );
}