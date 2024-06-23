
import { NextAuthProvider } from "@/components/providers/NextauthclientProvider";
import { SideBar } from "@/components/component/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <NextAuthProvider>
        <SideBar>
        {children}
        </SideBar>
      </NextAuthProvider>
    
  );
}
