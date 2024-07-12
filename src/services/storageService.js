export function saveConversation(conversation) {
    localStorage.setItem('savedConversation', JSON.stringify(conversation));
  }
  
  export function loadConversation() {
    const savedConversation = localStorage.getItem('savedConversation');
    return savedConversation ? JSON.parse(savedConversation) : null;
  }
  
  export function savePrompt(prompt) {
    const savedPrompts = JSON.parse(localStorage.getItem('savedPrompts') || '[]');
    savedPrompts.push(prompt);
    localStorage.setItem('savedPrompts', JSON.stringify(savedPrompts));
  }
  
  export function loadPrompts() {
    return JSON.parse(localStorage.getItem('savedPrompts') || '[]');
  }