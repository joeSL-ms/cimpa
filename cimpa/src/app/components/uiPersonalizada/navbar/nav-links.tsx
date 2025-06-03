'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from '@/styles/NavLinks.module.css'; // Importa el archivo CSS como módulo

interface LinkType {
  name: string;
  href: string;
  icon?: string;
}

interface NavLinksProps {
  links: LinkType[];
  className: string;
}

const NavLinks = ({ links, className }: NavLinksProps) => {
  const path = usePathname();

  return (
    <section className="flex">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={`${className} ${path === link.href ? "bg-orange-200" : ""} ${styles.link}`} // Aplica la clase del módulo solo en el enlace
        >
          <div className="flex items-center justify-center gap-2">
            {link.icon && (
              <Image src={link.icon} alt={link.name} width={30} height={30} />
            )}
            {link.name}
          </div>
        </Link>
      ))}
    </section>
  );
};

export default NavLinks;
