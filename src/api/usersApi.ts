export const registerUser = async (userData: {
  name: string;
  lastName1: string;
  lastName2: string;
  email: string;
  password: string;
}) => {
  const formattedUserData = {
    firstName: userData.name,
    lastName: `${userData.lastName1} ${userData.lastName2}`, // Concatenación de apellidos
    email: userData.email,
    password: userData.password,
  };

  try {
    const response = await fetch('http://10.0.2.2:8080/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedUserData),
    });

    const serverResponse = await response.text();
    const data = JSON.parse(serverResponse);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${data.message || 'Unknow error'}`);
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Fetch error:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
    throw error;
  }
};
