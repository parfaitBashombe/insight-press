import { Mail } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const NewsLetter = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Subscription feature is still in development!");
  };

  return (
    <section className="relative">
      <div className="relative bg-white border border-gray-200 rounded-3xl p-8 md:p-16 shadow-2xl overflow-hidden">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Stay in the Loop
          </h3>
          <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Get our latest articles, exclusive content, and insights delivered
            straight to your inbox. No spam, we promise.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center max-w-lg mx-auto gap-4"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-5 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Subscribe
            </button>
          </form>

          <p className="text-gray-500 text-sm mt-5">
            Join our community of readers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
