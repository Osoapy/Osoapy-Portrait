// Obtém o checkbox e o elemento <html> (root)
const themeToggle = document.querySelector('input[type="checkbox"]');
const root = document.documentElement;

// Função para alternar as variáveis CSS
function toggleTheme() {
  if (themeToggle.checked) {
    // Tema Claro
    root.style.setProperty('--bodyBackground', '#f9f9f9');
    root.style.setProperty('--arrowBackgroundColor', 'rgba(0, 0, 0, 0.5)');
    root.style.setProperty('--imageBoxShadow', 'rgba(0, 0, 0, 0.1)');
    root.style.setProperty('--boxBorderColor', '#ccc');
    root.style.setProperty('--boxBackgroundColor', '#fff');
    root.style.setProperty('--linkColor', '#0066cc');
    root.style.setProperty('--title', '#333');
    root.style.setProperty('--subtitle', '#444');
    root.style.setProperty('--text', '#555');
  } else {
    // Tema Escuro
    root.style.setProperty('--bodyBackground', '#121212');
    root.style.setProperty('--arrowBackgroundColor', 'rgba(255, 255, 255, 0.5)');
    root.style.setProperty('--imageBoxShadow', 'rgba(255, 255, 255, 0.1)');
    root.style.setProperty('--boxBorderColor', '#333');
    root.style.setProperty('--boxBackgroundColor', '#000');
    root.style.setProperty('--linkColor', '#99ccff');
    root.style.setProperty('--title', '#ccc');
    root.style.setProperty('--subtitle', '#bbb');
    root.style.setProperty('--text', '#aaa');
  }
}

// Adiciona um ouvinte de evento para o checkbox
themeToggle.addEventListener('change', toggleTheme);

// Inicializa o tema de acordo com o estado do checkbox
toggleTheme();