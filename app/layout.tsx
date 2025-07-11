// app/layout.tsx

import './globals.css';

export const metadata = {
  title: 'PlayRoster',
  description: 'Gestione realistica fantacalcio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
