import axios from 'axios';
import { ImageIcon, Upload, X } from 'lucide-react';
import React, { useState, useRef } from 'react';
import {apiEndpoints} from "../api/apiEndpoints"

const GenerateBox = ({ 
  activeTab,
  setGeneratedArt,
  selectedStyle,
  setSelectedStyle,
  image,
  setImage,
  imageFile,
  setImageFile,
  textPrompt,
  setTextPrompt,
 }) => {
  
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  

  const handleFileUpload = (file) => {
    if (file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    } else {
      alert("Please upload a valid image file.");
      setImage(null);
      setImageFile(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = () => {
    setImage(null);
    setImageFile(null);
  }
  const styles = [
    "anime",
    "analog-film",
    "photographic",
    "neon-punk",
    "cinematic",
    "pixel-art",
  ];

  const generateAiResponse = () => {
    if (activeTab !== "photo" && !image) {
      console.log('text')
      generateImageFromText();
    }
    else {
      generateImageFromImage();
      console.log("image");
    }
  };

  const generateImageFromText = async () => {
    console.log(textPrompt);
    console.log(selectedStyle);
    try {
      const response = await axios.get(apiEndpoints.GENERATE_FROM_TEXT, {
      params: { prompt: textPrompt },   // query params go here
      responseType: "arraybuffer"       // ensures binary response
    });

      console.log(response);

      // Convert byte array to image URL for preview
      const blob = new Blob([response.data], { type: "image/webp" }); // use webp if backend returns webp
      const imageUrl = URL.createObjectURL(blob);

      setGeneratedArt(imageUrl);
    } catch (error) {
      console.log("Error generating image from text: ",error);
    }
  };
  const generateImageFromImage = async () => {
    console.log(textPrompt);
    console.log(selectedStyle);
    if(!imageFile) return;
    console.log("this not run")
    try {

      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("prompt", textPrompt);

      const response = await axios.post(apiEndpoints.GENERATE_FROM_PHOTO, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "arraybuffer", // important for receiving image bytes
      });
      console.log(response);

      //convert byte array to image URL for preview
      const blob = new Blob([response.data], {type: "image/png"});
      const imageUrl = URL.createObjectURL(blob);
      setGeneratedArt(imageUrl);
      
    } catch (error) {
      console.log("Error generating image from image: ",error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Photo to {selectedStyle}
      </h2>

      {activeTab === "photo" && (
        <div
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 h-52 cursor-pointer transition ${
            isDragging ? "border-indigo-400 bg-indigo-50" : "border-gray-300"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current.click()}
        >
          {image ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={image}
                alt="Uploaded preview"
                className="rounded-xl shadow-md max-h-full object-contain w-full"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-red-100"
              >
                <X size={16} className="text-red-500" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 text-gray-500">
              <ImageIcon size={48} />
              <p className="text-sm">Drag & drop your image here or click to browse</p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
        </div>
      )}

      {/* Dropdown for Style Selection */}
      <div className="mt-4">
        <label className="block text-gray-600 text-sm mb-1">Choose Style</label>
        <select
          value={selectedStyle}
          onChange={(e) => setSelectedStyle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-red-400"
        >
          {styles.map((style, idx) => (
            <option key={idx} value={style}>
              {style}
            </option>
          ))}
        </select>
      </div>

      {/* Additional Details */}
      <textarea
        placeholder="Add any specific details or enhancements..."
        value={textPrompt}
        onChange={(e) => setTextPrompt(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 mt-4 h-20 focus:ring-2 focus:ring-red-400"
      />

      {/* Button */}
      <button
        onClick={() => generateAiResponse()}
        className="w-full mt-4 bg-gray-800 text-white rounded-lg py-3 hover:bg-gray-900"
      >
        Transform to {selectedStyle}
      </button>
    </div>
  );
};

export default GenerateBox;
