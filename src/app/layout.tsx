import type { FC, PropsWithChildren } from "react";
import "@/tailwind.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className="antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
