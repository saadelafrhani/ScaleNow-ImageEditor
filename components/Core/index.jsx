import React, { useState, useRef, useEffect } from "react";
import imageCompression from "browser-image-compression"; // Import the library

const Core = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageSize, setImageSize] = useState(0); // To store the actual size of the image in KB
  const [desiredSize, setDesiredSize] = useState(""); // To store the user input for desired compressed size
  const [compressedImage, setCompressedImage] = useState(null); // Store the compressed image
  const [loading, setLoading] = useState(false); // Show loading state
  const [showHiddenDiv, setShowHiddenDiv] = useState(false); // To control visibility of the hidden div
  const [showAlertBox, setShowAlertBox] = useState(false); // State for alert visibility
  const fileInputRef = useRef(null); // Create a ref to access the file input element

  useEffect(() => {
    // Show alert on component mount
    setShowAlertBox(true);
    const timer = setTimeout(() => {
      setShowAlertBox(false);
    }, 3000); // Hide alert after 3 seconds
    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(file); // Set the selected image file
      setImageSize((file.size / 1024).toFixed(2)); // Convert size from bytes to KB
      setShowHiddenDiv(true); // Show the hidden div when the image is selected
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null); // Remove the image and restore the original content
    setCompressedImage(null); // Clear compressed image
    setShowHiddenDiv(false); // Hide the hidden div
  };

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };

  const handleDesiredSizeChange = (e) => {
    setDesiredSize(e.target.value); // Update the desired size based on user input
  };

  const handleCompressImage = async () => {
    if (selectedImage && desiredSize) {
      setLoading(true); // Start loading
      try {
        const options = {
          maxSizeMB: desiredSize / 1024, // Convert KB to MB
          maxWidthOrHeight: 1920, // Set max width/height (adjustable)
          useWebWorker: true, // Use web workers for faster compression
        };

        const compressedFile = await imageCompression(selectedImage, options);
        setCompressedImage(URL.createObjectURL(compressedFile)); // Create a URL for the compressed image
        setImageSize((compressedFile.size / 1024).toFixed(2)); // Update the image size after compression
        alert("Image compressed successfully!");

        // Simulate a loading delay
        setTimeout(() => {
          setLoading(false); // Stop loading after 2 seconds
        }, 2000);
      } catch (error) {
        console.error("Error compressing image:", error);
        setLoading(false);
      }
    }
  };

  return (
    <div
      className={`flex flex-col justify-start px-2 ${selectedImage ? "p-10" : "p-[160px]"
        }`}
    >
      {/* Alert Box */}
      {showAlertBox && (
       <div
       id="customAlert"
       style={{
         display: "flex",
         justifyContent: "center",
         alignItems: "center", // Center content vertically
         padding: "10px",
         backgroundColor: "rgba(255, 0, 0, 0.7)", // Red background
         color: "white",
         textAlign: "center",
         borderRadius: "5px",
         marginBottom: "20px",
         width: "300px",
         margin: "0 auto", 
       }}
     >
       compress not able to all pics will be fixed soon!!!!
     </div>

      )}

      <div className="max-w-[1400px] w-full gap-6">
        <h1 className="text-6xl p-10 text-center ">
          <strong>Compress Image</strong>
        </h1>
      </div>

      <label className="max-w-[1400px] w-full h-[30vh] flex flex-col items-center justify-center gap-4 p-2 md:p-8 border-dashed border-4 border-yellow-500 rounded-[30px] cursor-pointer">
        {selectedImage ? (
          <div className="relative w-full h-full">
            <img
              src={compressedImage || URL.createObjectURL(selectedImage)}
              alt="Uploaded"
              className="object-contain w-full h-[100%] rounded-[30px]"
            />
            <button
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
              onClick={handleRemoveImage}
            >
              Remove
            </button>
          </div>
        ) : (
          <>
            <input
              type="file"
              ref={fileInputRef} // Reference to file input
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
            <img src="/download.svg" alt="downloadIcon" className="w-20 md:w-24" />
            <h1 className="text-xl text-center">
              <strong>
                Drop your images here or{" "}
                <span className="text-yellow-500 hover:border-b-2 hover:border-yellow-500">
                  browse.
                </span>
              </strong>
            </h1>
            <button
              className="p-4 bg-yellow-400 hover:bg-gray-500 rounded-lg transition duration-300"
              type="button"
              onClick={handleButtonClick}
            >
              <strong>Select Image</strong>
            </button>
          </>
        )}
      </label>

      {showHiddenDiv && (
        <div
          className="hidden-div"
          style={{
            paddingTop: "20px",
            height: "260px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <h1 className="text-2xl p-4 text-center">
            <strong>Image Compression Options</strong>
          </h1>

          <label
            style={{
              width: "200px",
              minHeight: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              textAlign: "center",
              borderRadius: "10px",
              marginBottom: "10px",
              padding: "10px",
              border: "2px dashed white",
            }}
          >
            Actual Size: {imageSize} KB
          </label>

          <label
            style={{
              width: "250px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "5px",
              border: "2px dashed white",
              borderRadius: "10px",
            }}
          >
            Desired Size (KB):
            <input
              type="number"
              value={desiredSize}
              onChange={handleDesiredSizeChange}
              style={{
                marginLeft: "10px",
                padding: "5px",
                borderRadius: "5px",
                width: "70px",
                border: "1px solid #ccc",
              }}
            />
          </label>

          <button
            className="p-4 mt-4 bg-yellow-500 hover:bg-gray-500 text-white rounded-lg"
            onClick={handleCompressImage}
            disabled={loading} // Disable button when loading
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span>Compressing...</span>
                <div className="loader"></div> {/* You can add a loading spinner here */}
              </div>
            ) : (
              <strong>Compress Image</strong>
            )}
          </button>

          {compressedImage && (
            <a
              href={compressedImage}
              download="compressed-image.jpg" // Change file name as needed
              className="p-4 mt-4 bg-green-500 hover:bg-gray-500 text-white rounded-lg"
            >
              Download Compressed Image
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default Core;
