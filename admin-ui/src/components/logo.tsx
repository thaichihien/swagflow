import darkLogo from "@/assets/logos/dark.svg";
import logo from "@/assets/logos/main.svg";
import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-8 max-w-[10.847rem]">
      {/* <Image
        src={logo}
        fill
        className="dark:hidden"
        alt="NextAdmin logo"
        role="presentation"
        quality={100}
      />

      <Image
        src={darkLogo}
        fill
        className="hidden dark:block"
        alt="NextAdmin logo"
        role="presentation"
        quality={100}
      /> */}

      <h2
        className="dark:hidden"
        style={{
          fontSize: "2rem",
          textAlign: "center",
        }}
      >
        <div className="logo-font logo-light">
          Swag<span>Flow</span>
        </div>
      </h2>

      <h2
        className="logo-dark hidden dark:block"
        style={{
          fontSize: "2rem",
          textAlign: "center",
        }}
      >
        <div className="logo-font">
          Swag<span>Flow</span>
        </div>
      </h2>
    </div>
  );
}
