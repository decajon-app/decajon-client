const getChatbotResponse = (
  inputText: string,

  // Variables a utilizar para información del usuario
  userName: string,
  groupName: string,
  songName: string,
  songDetails: string,
  nextRehearsalDate: string,
  rehearsalSongs: string[],
  songStyle: string,
  eventDate: string

): string => {
  let botResponse = '¡Hola! ¿En qué puedo ayudarte?';

  if (inputText.toLowerCase().includes('cancion') && inputText.toLowerCase().includes('grupo')) {
    botResponse = "La canción 'Guadalajara' se ha agregado al grupo 'Mariachi' correctamente!";
  } else if (inputText.toLowerCase().includes('canción') && inputText.toLowerCase().includes('grupo')) {
    botResponse = "La canción 'Guadalajara' se ha agregado al grupo 'Mariachi' correctamente!";
  } else if (inputText.toLowerCase().includes('ensayar')) {
    botResponse = 'Las canciones pendientes por ensayar son:\n\n•El Rey\n-Vicente Fernández\n\n•Cielito Lindo\n-Pedro Infante\n\n•La Bikina\n-Luis Miguel\n\n•Volver Volver\n-Vicente Fernández\n\n•Guadalajara\n-Mariachi Vargas';
  }

  return botResponse;
};

export default getChatbotResponse;