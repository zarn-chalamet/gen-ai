import React from "react";
import { Download, XCircle, Image as ImageIcon } from "lucide-react"; // modern icons

const GeneratedArt = ({ generatedArt, onCancel,}) => {

  const handleDownload = () => {
    if (!generatedArt) return;

    const link = document.createElement("a");
    link.href = generatedArt;  // already an object URL
    link.setAttribute("download", "generatedPhoto.png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className=" flex flex-col items-center justify-center">
      {!generatedArt ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <ImageIcon className="w-16 h-16 mb-4 text-gray-400" />
          <p className="text-lg font-medium">Your generated art will show here.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-full h-[360px] flex items-center justify-center">
            <img
              src={generatedArt}
              alt="Generated art"
              className="max-h-full max-w-full rounded-xl shadow-md object-contain"
            />
          </div>


          {/* Action buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={onCancel}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-500 text-white font-medium shadow hover:bg-red-600 transition"
            >
              <XCircle className="w-5 h-5" /> Cancel
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
            >
              <Download className="w-5 h-5" /> Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratedArt;
