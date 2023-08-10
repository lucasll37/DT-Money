import { ReactNode, createContext, useEffect, useState } from "react";

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
}

export const TransactionsContext = createContext({} as TransactionContextType);

interface TransactionsProviderProps {
    children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    
    async function loadTransanctions() {
        const response = await fetch("http://localhost:3000/transactions")
        const data = await response.json();
        setTransactions(data);
    }
    useEffect(() => {
        loadTransanctions();
    }, []);
    
    return (
        <TransactionsContext.Provider value={{ transactions }}>
            {children}
        </TransactionsContext.Provider>
    )
}