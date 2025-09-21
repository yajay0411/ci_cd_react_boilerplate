import { createRoot } from 'react-dom/client';

import '@/global.scss';

import App from '@/App';

import Provider from './core/Provider/Provider';

createRoot(document.getElementById('root')!).render(
    <Provider>
        <App />
    </Provider>
);
