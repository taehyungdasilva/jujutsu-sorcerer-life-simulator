import React from 'react';
import ReactDOM from 'react-dom/client';

export function bootstrap() {
  return React.createElement('div', null, 'Architecture scaffold ready');
}

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(bootstrap());
