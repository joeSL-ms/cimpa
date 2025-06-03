import Image from "next/image";
import { ReactNode } from "react";

interface LogoProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    children?: ReactNode; 
}

const Logo = ({ src, alt, width, height, children }: LogoProps) => {
    return (
        <div className="flex items-center justify-center m-6">
            <Image src={src} alt={alt} width={width} height={height} />
            {children}
        </div>
    );
}

export default Logo;