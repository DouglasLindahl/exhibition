"use client"
import { Inter } from 'next/font/google'
import './globals.css'
import { GraphQLClient, ClientContext } from 'graphql-hooks';

const client = new GraphQLClient({
  url: 'https://graphql.datocms.com/',
  headers: {
      Authorization: `Bearer ${process.env.CMS_API_TOKEN}`,
  },
});

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClientContext.Provider value={client}>
        <body className={inter.className}>{children}</body>
      </ClientContext.Provider>
    </html>
  )
}
