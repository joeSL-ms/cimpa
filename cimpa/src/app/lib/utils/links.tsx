const linksDinamics = [
    { name: "Home", href: "/home", icon: "/img/hogar1.png" },
    { name: "Notificaciones", href: "/home/notificaciones", icon: "/img/mision.png" },
];
const linksStaticsInd = [
    { name: "Cartera", href: "/home/cartera/", icon: "/img/billetera.png" },
    { name: "Misiones", href: "/home/misiones/", icon: "/img/mision.png" },
    { name: "Ayuda", href: "/home/ayuda/", icon: "/img/ayuda.png" },
]
const linksStatics = [
    {
        name: "Perfil",
        icon: "/img/cuenta2.png",
        subLinks: [
            { name: "Usuario", href: "/home/usuario/" },
            { name: "Configuracion", href: "/home/usuario/configuracion" },
        ],
    },
];

const navLinks = {
    linksDinamics,
    linksStatics,
    linksStaticsInd,
};

export default navLinks;