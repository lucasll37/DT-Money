import { ReactNode, /* createContext,*/ useEffect, useState, useCallback } from "react";
import { api } from "../libs/axios";
import { createContext } from "use-context-selector";

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
    
    const fetchTransanctions = useCallback(async (query?: string) => {
        const response = await api.get("/transactions", {
            params: {
                _sort: "createdAt",
                _order: "desc",
                q: query
            }
        })

        setTransactions(response.data);
    }, [])

    const createTransaction = useCallback(async (data: CreateTransactionInput) => {
        const { category, price, description, type } = data;
        const response = await api.post("transactions", {
            category,
            price,
            description,
            type,
            createdAt: new Date()
        });

        setTransactions(state => [...state, response.data]);
    }, [])

    useEffect(() => {
        fetchTransanctions();
    }, [fetchTransanctions]);
    
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