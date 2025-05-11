"use client";

import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';


export function AppBar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false, callbackUrl: "/" });
    router.push("/"); // Redirect to homepage
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full shadow-sm bg-white">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-2">
                <Button
                  className="bg-[#15b484] cursor-pointer"
                  onClick={handleSignOut}
                  variant="default"
                >
                  Sign out
                </Button>
              </div>
            ) : (
              <Button
                className="bg-[#15b484] cursor-pointer"
                onClick={() => signIn()}
                variant="default"
              >
                Login
              </Button>
            )}
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex items-center gap-2">
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>
          <MobileNavMenu isOpen={isMobileMenuOpen}>
            <div className="flex w-full flex-col gap-4">
              {session ? (
                <NavbarButton
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  variant="primary"
                  className="w-full bg-[#15b484] cursor-pointer"
                >
                  Sign out
                </NavbarButton>
              ) : (
                <NavbarButton
                  onClick={() => {
                    signIn();
                    setIsMobileMenuOpen(false);
                  }}
                  variant="primary"
                  className="w-full bg-[#15b484] cursor-pointer"
                >
                  Login
                </NavbarButton>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </header>
  );
}
