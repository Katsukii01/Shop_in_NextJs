import App from '@/components/App'
import './globals.css'
import { Inter } from 'next/font/google'
import { StoreProvider } from '@/redux/StoreProvider'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <head>
        <script src="https://js.stripe.com/v3/"></script>
      </head>

      <body className={inter.className}>
        
        <StoreProvider>
       
            <App>{children}</App>
         
        </StoreProvider>
      </body>
     
    </html>
    </ClerkProvider>
  );
}