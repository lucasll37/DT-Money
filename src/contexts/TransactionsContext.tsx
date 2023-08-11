import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../libs/axios";

interface ITransaction {
    id: number;
    description: string;
    type: "income" | "outcome";
    price: number;
    category: string;
    createdAt: string;
}

interface TransactionContextType {
    transactions: ITransaction[];
    fetchTransanctions: (query?: string) => Promise<void>;
}

export const TransactionsContext = createContext({} as TransactionContextType);

interface TransactionsProviderProps {
    children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    
    async function fetchTransanctions(query?: string) {
        const response = await api.get("/transactions", {
            params: {
                _sort: "createdAt",
                _order: "desc",
                q: query
            }
        })

        setTransactions(response.data);
    }

    // async function createTransaction() {
    //     const response = await api.post("/transactions", {
    //         description: "Teste",
    //     })
    // }

    useEffect(() => {
        fetchTransanctions();
    }, []);
    
    return (
        <TransactionsContext.Provider value={{
            transactions,
            fetchTransanctions
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}