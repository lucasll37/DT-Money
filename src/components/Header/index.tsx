import igniteLogo from "../../assets/ignite-logo.svg";
import { NewTransactionModal } from "../NewTransactionModal";

import {
    HeaderContainer,
    HeaderContent,
    NewTransactionButton
} from "./styles";

import * as Dialog from "@radix-ui/react-dialog";


export function Header() {
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={igniteLogo} />
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <NewTransactionButton>
                            Nova Transação
                        </NewTransactionButton>
                    </Dialog.Trigger>
                    <NewTransactionModal />
                </Dialog.Root>
            </HeaderContent>
        </HeaderContainer>
    )
}
