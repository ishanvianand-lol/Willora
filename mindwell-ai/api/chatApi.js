const API_URL = 'http://localhost:5000/api/chat';

export const sendMessageToAI = async (message) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error('Error talking to AI:', error);
    return 'Sorry, I had trouble understanding you.';
  }
};
