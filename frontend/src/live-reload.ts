export function runLiveReload() {
  const script = document.createElement('script');

  script.src = 'http://localhost:35729/livereload.js?snipver=1';
  document.head.appendChild(script);
}