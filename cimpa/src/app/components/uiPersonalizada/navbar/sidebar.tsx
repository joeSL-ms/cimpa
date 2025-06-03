'use client';
import '@/styles/sideBar.css';
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import styles from '@/styles/NavLinks.module.css';

interface LinkType {
  name: string;
  href: string;
  icon?: string;
}

interface NavLinksProps {
  name: string;
  icon?: string;
  subLinks: LinkType[];
}

interface SidebarProps {
  links: LinkType[];
  bodylinks: NavLinksProps[];
  linksInf: LinkType[];
}

const Sidebar = ({ links, bodylinks, linksInf }: SidebarProps) => {
  return (
    <>
      {links.map((link) => (
        <StaticLink key={link.name} link={link} />
      ))}

      {bodylinks.map((link) => (
        <Dropdown key={link.name} link={link} />
      ))}
      
      {linksInf.map((link) => (
        <StaticLink key={link.name} link={link} />
      ))}
    </>
  );
};

const StaticLink = ({ link }: { link: LinkType }) => {
  const path = usePathname();
  return (
    <div className='dropdown-container ursor-pointer'>
      <Link href={link.href} className={`title-container ${path === link.href ? "bg-orange-300" : ""} `}>

        {link.icon && (
          <Image src={link.icon} alt={link.name} width={25} height={25} />
        )}
        {link.name}

      </Link >
    </div>
  );
};

const Dropdown = ({ link }: { link: NavLinksProps }) => {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Abre automáticamente si un sublink está activo
  useEffect(() => {
    const isActive = link.subLinks.some(subLink => subLink.href === path);
    if (isActive) {
      setIsOpen(true);
    }
  }, [path, link.subLinks]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className='drowdon-container'>
      <div onClick={toggleDropdown} className="title-container cursor-pointer">
        {link.icon && (
          <Image src={link.icon} alt={link.name} width={25} height={25} />
        )}
        <h2 className="dropdown-title">{link.name}</h2>
        <span className={`dropdown-arrow ${isOpen ? 'rotate' : ''}`}>▼</span>
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          {link.subLinks.map((subLink) => (
            <Link
              key={subLink.name}
              href={subLink.href}
              className={`dropdown-link ${path === subLink.href ? "bg-orange-200" : ""} ${styles.link}`}
            >
              <div className="dropdown-item">
                <span />
                {subLink.icon && (
                  <Image src={subLink.icon} alt={subLink.name} width={25} height={25} />
                )}
                <span>{subLink.name}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};



export default Sidebar;