import React, { useState } from "react";
import axios from "axios";

function App() {
  const [postData, setPostData] = useState(""); // State for input data
  const [postResponse, setPostResponse] = useState(null); // State for POST response
  const [getResponse, setGetResponse] = useState(null); // State for GET response
  const [loading, setLoading] = useState(false); // Loading state

  const apiUrl = "bajaj-bfhl-production.up.railway.app/bfhl"; // Base API URL

  // Handle POST request
  const handlePost = async () => {
    setLoading(true);
    try {
      const parsedData = JSON.parse(postData);
      const response = await axios.post(apiUrl, parsedData);
      setPostResponse(response.data);
    } catch (error) {
      console.error("Error with POST request:", error.message);
      // alert("Invalid JSON format or server error");
    } finally {
      setLoading(false);
    }
  };

  // Handle GET request
  const handleGet = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl);
      setGetResponse(response.data);
    } catch (error) {
      console.error("Error with GET request:", error.message);
      alert("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-300 to-purple-300 text-gray-800">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">JSON Data Processor</h1>

        {/* Input Field */}
        <textarea
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-indigo-500"
          rows="5"
          placeholder={`Enter JSON data, e.g.,\n${JSON.stringify({
            data: ["M", "1", "334", "4", "B", "Z", "a", "7"],
          }, null, 2)}`}
          value={postData}
          onChange={(e) => setPostData(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handlePost}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Submit (POST)
          </button>
          <button
            onClick={handleGet}
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Fetch Data (GET)
          </button>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <p className="text-center text-indigo-500">Loading...</p>
        )}

        {/* POST Response */}
        {postResponse && (
          <div className="bg-indigo-100 p-3 rounded mt-4">
            <h3 className="font-bold">POST Response:</h3>
            <pre className="text-sm">{JSON.stringify(postResponse, null, 2)}</pre>
          </div>
        )}

        {/* GET Response */}
        {getResponse && (
          <div className="bg-purple-100 p-3 rounded mt-4">
            <h3 className="font-bold">GET Response:</h3>
            <pre className="text-sm">{JSON.stringify(getResponse, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
