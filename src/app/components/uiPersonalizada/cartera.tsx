import { WalletMenu } from '@/components/menuStatics';
import type { WalletProps } from '@/types/typewallet';

const Wallet = ({
    dataEcotime = [],
    dataIngreso = [],
    dataGastos = [],

}: WalletProps) => {
    return (
        <>
            <WalletMenu dataEcotime={dataEcotime}
                dataIngreso={dataIngreso}
                dataGastos={dataGastos} />
        </>
    );
}

export {
    Wallet
}