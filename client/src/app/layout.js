import "./globals.css"; //
import { Sidebar, Navbar } from "../components"; // Adjust the import path as necessary
import { StateContextProvider } from "@/context";

const Layout = ({ children }) => {
  return (
    <StateContextProvider>
      <html lang="en">
        <head>
          <title> Crowdfunding - Web3</title>
        </head>
        {" "}
        {/* Add the <html> tag */}
        <body className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
          {" "}
          {/* Add the <body> tag */}
          <div className="sm:flex hidden mr-10 relative">
            <Sidebar />
          </div>
          <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
            <Navbar />
            {children} {/* This will render the content of the page */}
          </div>
        </body>
      </html>
    </StateContextProvider>
  );
};

export default Layout;
