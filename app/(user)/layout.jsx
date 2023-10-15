import "../globals.css";
import { Inter } from "next/font/google";
import Provider from "../../context/provider";
import Header from "../../components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Milky Way",
  description: "Generate by divy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f7f6f4]`}>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}