"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const handleCloseBrowser = () => {
    window.open('', '_self'); // some browsers
    window.close();
  };

  return (
    <div>
      Completed quit the browser;
    </div>
  );
}
