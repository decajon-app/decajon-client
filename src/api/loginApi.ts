export const loginUser = async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch("http://10.0.2.2:8080/auth/login", { //////TOBEDONE
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
  
      const serverResponse = await response.text();
      console.log("DEBUG: serverResponse", serverResponse);

      let data;
      try {
        data = JSON.parse(serverResponse);
      } catch (error) {
        console.error("Error parsing JSON server response:", error);
        throw new Error(`Error not valid response from server: ${response.status} - ${serverResponse}`);
      }
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${data.message || "Unknown error"}`);
      }
  
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Fetch error:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
      throw error;
    }
  };
  