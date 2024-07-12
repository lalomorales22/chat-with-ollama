export function estimateTokens(text) {
    // This is a very rough estimate and should be replaced with a more accurate method
    return Math.ceil(text.split(' ').length * 1.3);
  }
  
  export function extractTasks(text) {
    // This is a simple implementation and might need to be more sophisticated
    const tasks = text.match(/- (.+)/g);
    return tasks ? tasks.map(task => task.substring(2)) : [];
  }
  
  export function formatTimestamp(date) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }
  
  export function replacePersonalDetails(message, personalDetails) {
    let processedMessage = message;
    for (const [key, value] of Object.entries(personalDetails)) {
      if (typeof value === 'object') {
        processedMessage = processedMessage.replace(`{{${value.key}}}`, value.value);
      } else {
        processedMessage = processedMessage.replace(`{{${key}}}`, value);
      }
    }
    return processedMessage;
  }