import React, { useState } from "react";
import GenerateBox from "../components/GenerateBox";
import GeneratedArt from "../components/GeneratedArt"

const CreatePage = () => {

  const [activeTab, setActiveTab] = useState("photo");
  const [generatedArt, setGeneratedArt] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState("anime");
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [textPrompt, setTextPrompt] = useState("");

  const onCancel = () => {
    setImage(null);
    setImageFile(null);
    setGeneratedArt(null);
    setTextPrompt("");
    setSelectedStyle("anime");
  }
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-6 w-full max-w-5xl">
        <button onClick={() => setActiveTab("photo")}
            className={`px-6 py-3 font-medium text-sm transition ${
              activeTab === "photo"
                ? "border-b-2 border-red-500 text-gray-800"
                : "text-gray-500 hover:text-indigo-500"
            }`}
>
          Photo to Art
        </button>
        <button onClick={() => setActiveTab("text")}
            className={`px-6 py-3 font-medium text-sm transition ${
              activeTab === "text"
                ? "border-b-2 border-red-500 text-gray-800"
                : "text-gray-500 hover:text-indigo-500"
            }`}
>
          Text to Art
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        <GenerateBox 
          activeTab={activeTab}
          setGeneratedArt={setGeneratedArt}
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
          image={image}
          setImage={setImage}
          imageFile={imageFile}
          setImageFile={setImageFile}
          textPrompt={textPrompt}
          setTextPrompt={setTextPrompt}
        />

        {/* Result Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex items-center justify-center text-gray-400 text-center h-[450px]">
          <GeneratedArt generatedArt={generatedArt} onCancel={onCancel}/>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
