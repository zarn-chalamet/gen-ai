import React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Image as ImageIcon, Code } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Generate Stunning AI Photos
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Transform your ideas into beautiful, detailed AI-generated images.
          Create from text prompts or enhance with your own photos.
        </p>
        <button
          onClick={() => navigate("/create")}
          className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition"
        >
          Create Now
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Features
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <Sparkles className="text-indigo-600 w-8 h-8 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">
                Generate from Prompt
              </h3>
            </div>
            <p className="text-gray-600">
              Just type your imagination and watch it turn into stunning AI art.
              Powered by the latest Stable Diffusion models.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <ImageIcon className="text-indigo-600 w-8 h-8 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">
                Generate from Image + Prompt
              </h3>
            </div>
            <p className="text-gray-600">
              Upload your image and add a prompt to enhance, re-style, or
              transform it into something new and creative.
            </p>
          </div>
        </div>
      </section>

      {/* About Stability AI */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Code className="text-indigo-600 w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Powered by Stability AI
          </h2>
          <p className="text-gray-600 text-lg">
            This project integrates with the{" "}
            <a
              href="https://platform.stability.ai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 font-medium hover:underline"
            >
              Stability AI API
            </a>{" "}
            to deliver state-of-the-art AI-generated visuals. Stable Diffusion
            ensures your creations are beautiful, detailed, and professional.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
