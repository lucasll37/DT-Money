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
    createTransaction: (data: CreateTransactionInput) => Promise<void>;
}


interface TransactionsProviderProps {
    children: ReactNode;
}

interface CreateTransactionInput {
    description: string;
    price: number;
    category: string;
    type: "income" | "outcome";
}

export const TransactionsContext = createContext({} as TransactionContextType);

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

    async function createTransaction(data: CreateTransactionInput) {
        const { category, price, description, type } = data;
        const response = await api.post("transactions", {
            category,
            price,
            description,
            type,
            createdAt: new Date()
        });

        setTransactions(state => [...state, response.data]);
    }

    useEffect(() => {
        fetchTransanctions();
    }, []);
    
    return (
        <TransactionsContext.Provider value={{
            transactions,
            fetchTransanctions,
            createTransaction
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}