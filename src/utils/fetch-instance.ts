const BASE_URL = import.meta.env.VITE_BASE_URL + "api";
const user = localStorage.getItem("user") || "{}";
const token = JSON.parse(user)?.token;

interface FetchInstanceOptions extends RequestInit {
  body?: any; // Optional body for POST requests
}

export const fetchInstance = async (
  url: string,
  options: FetchInstanceOptions = {}
) => {
  // Set default headers for the request, including authorization token if available
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `${token}` } : {}),
    ...(options.headers || {}),
  };

  // Construct the full URL
  const fullUrl = `${BASE_URL}/${url}`;

  try {
    const response = await fetch(fullUrl, {
      ...options, // Spread existing options
      headers, // Override headers to include Content-Type and Authorization
      body: options.body ? JSON.stringify(options.body) : undefined, // Body only for POST requests
    });

    // Check for a successful response
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Something went wrong!");
    }

    // Parse the response as JSON
    return await response.json();
  } catch (error) {
    // Handle fetch errors (e.g., network issues)
    console.error("Error in fetch request:", error);
    throw error;
  }
};
