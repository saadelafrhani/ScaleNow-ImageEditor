import React, { useState, useRef } from "react";
import axios from "axios";

const Removebg = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageSize, setImageSize] = useState(0);
    const [removedBgImage, setRemovedBgImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showHiddenDiv, setShowHiddenDiv] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(file);
            setImageSize((file.size / 1024).toFixed(2));
            setShowHiddenDiv(true);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        setRemovedBgImage(null);
        setShowHiddenDiv(false);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleRemoveBackground = async () => {
        if (selectedImage) {
            setLoading(true); // Start loading
            const formData = new FormData();
            formData.append("image_file", selectedImage);

            try {
                const response = await axios.post(
                    "https://api.remove.bg/v1.0/removebg",
                    formData,
                    {
                        headers: {
                            "X-Api-Key": "ZugC9Y9TcpqDoz3y5JZLjfqL", // Use your actual API key
                        },
                        responseType: "blob",
                    }
                );

                const blob = new Blob([response.data], { type: "image/png" });
                const removedBgImageUrl = URL.createObjectURL(blob);
                setRemovedBgImage(removedBgImageUrl); // Set the background removed image

                setLoading(false); // Stop loading
            } catch (error) {
                console.error("Error removing background:", error.response ? error.response.data : error.message);
                setLoading(false);
            }
        }
    };

    const handleDownloadImage = () => {
        const link = document.createElement("a");
        link.href = removedBgImage;
        link.download = "background-removed.png";
        link.click();
    };

    return (
        <div className={`flex flex-col justify-start px-2 ${selectedImage ? "p-10" : "p-[160px]"}`}>
            <div className="max-w-[1400px] w-full gap-6">
                <h1 className="text-4xl p-5 text-center sm:text-6xl sm:p-10">
                    <strong>Remove Image Background</strong>
                </h1>
            </div>

            <label className="max-w-[1400px] w-full h-[30vh] flex flex-col items-center justify-center gap-4 p-2 md:p-8 border-dashed border-4 border-yellow-500 rounded-[30px] cursor-pointer">
                {selectedImage ? (
                    <div className="relative w-full h-full">
                        <img
                            src={URL.createObjectURL(selectedImage)}
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
                            ref={fileInputRef}
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
                <div className="flex flex-col items-center gap-6 pt-6">
                    <h1 className="text-2xl">
                        <strong>Background Removal Option</strong>
                    </h1>

                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="flex flex-col items-center">
                            <h3 className="mb-2"> <strong>Original Image</strong></h3>
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Original"
                                className="max-w-[200px] rounded-[20px]"
                            />
                        </div>

                        {removedBgImage && (
                            <div className="flex flex-col items-center">
                                <h3 className="mb-2"> <strong>Background Removed Image</strong></h3>
                                <img
                                    src={removedBgImage}
                                    alt="Background Removed"
                                    className="max-w-[200px] rounded-[20px]"
                                />
                            </div>
                        )}
                    </div>

                    {removedBgImage && (
                        <button
                            className="mt-4 p-2 bg-green-500 text-white rounded-lg"
                            onClick={handleDownloadImage}
                        >
                            Download Image
                        </button>
                    )}

                    <button
                        className="p-4 bg-yellow-500 hover:bg-gray-500 text-white rounded-lg"
                        onClick={handleRemoveBackground}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <span>Removing Background...</span>
                                <div className="loader"></div>
                            </div>
                        ) : (
                            <strong>Remove Background</strong>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Removebg;
