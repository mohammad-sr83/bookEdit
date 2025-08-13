import { Metadata } from "next";
import "./globals.css";
import type { Viewport } from 'next'
 
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata = {
  title: 'سامانه یکپارچه مدیریت درسی ',
  description: 'سامانه یکپارچه مدیریت محتوا برای کارکنان ',
  icons: "/image/logo.jpg",
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" dir="rtl">
      <body className="font-iranyekan font-medium"  >
          {children}    
      </body>
    </html>
  );
}
