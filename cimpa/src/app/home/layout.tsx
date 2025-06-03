import Logo from "@/components/uiPersonalizada/logo";
import Sidebar from "@/components/uiPersonalizada/navbar/sidebar";
import dataLinks from "@/lib/utils/links";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <nav className="h-[100px] p-4 flex justify-end">
                <div className="flex-1 flex justify-between gap-10">
                    <Logo src="/img/logo.png" alt="Imengen Logo" width={150} height={100} />
                </div>
            </nav>
            <section className="flex flex-1 min-h-0">
                <aside className="flex flex-col gap-4 w-[225px] bg-[#F7941D] p-4">
                    <Sidebar links={dataLinks.linksDinamics} bodylinks={dataLinks.linksStatics} linksInf={dataLinks.linksStaticsInd} />
                </aside>

                <div className="flex-1 overflow-auto">
                    {children}
                </div>
            </section>
        </>
    );
}
