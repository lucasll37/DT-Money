import { MagnifyingGlass } from 'phosphor-react';
import { SearchFormContainer } from './styles';
import { useForm } from 'react-hook-form';
import * as zod from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { TransactionsContext } from '../../../../contexts/TransactionsContext';

const searchFormSchema = zod.object({
    query: zod.string()
});

type SearchFormSchemaInputs = zod.infer<typeof searchFormSchema>;

export function SearchForm() {

    const { fetchTransanctions } = useContext(TransactionsContext);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
     } = useForm<SearchFormSchemaInputs>({
        resolver: zodResolver(searchFormSchema)
    });

    async function handleSearchTransactions(data: SearchFormSchemaInputs) {
        await fetchTransanctions(data.query);
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input
                type="text"
                placeholder="Busque por transações"
                {...register('query')}
            />
            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20} />
                Buscar
            </button>

        </SearchFormContainer>
    )
}