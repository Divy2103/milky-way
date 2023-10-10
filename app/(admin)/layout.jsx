import "../globals.css";
import { Inter } from "next/font/google";
import Provider from "../../context/provider";
import Sidebar from "../../components/admin/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Milky Way",
  description: "Generate by divy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Sidebar>{children}</Sidebar>
        </Provider>
      </body>
    </html>
  );
}
