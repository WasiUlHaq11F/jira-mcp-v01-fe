import {
    useQueryStates,
    parseAsString,
    Options
} from 'nuqs';
import { useCallback, useMemo } from 'react';
import { SortingState, OnChangeFn, Updater } from '@tanstack/react-table';

/**
 * URL parsers for infinite scroll tables — no page/pageSize in URL.
 */
const infiniteTableParsers = {
    sort: parseAsString.withDefault(''),
};

/**
 * URL state management hook for infinite scroll tables.
 * Like useDataTableQueryState but without page/pageSize — those are managed
 * internally by useInfiniteQuery.
 */
export function useDataTableInfiniteQueryState<T extends Record<string, any>>(
    filterParsers: T,
    options: Options = { history: 'push', shallow: true },
) {
    const parsers = useMemo(() => ({
        ...infiniteTableParsers,
        ...filterParsers,
    }), [filterParsers]);

    const [state, setState] = useQueryStates(parsers, options);

    // Convert URL sort string to TanStack Table sorting state
    const sorting: SortingState = useMemo(() => {
        const sort = (state as any).sort;
        if (!sort || typeof sort !== 'string') return [];

        return sort.split(',').map((s: string) => {
            const desc = s.startsWith('-');
            const id = desc ? s.slice(1) : s;
            return { id, desc };
        });
    }, [(state as any).sort]);

    // Handler for TanStack Table sorting change
    const onSortingChange: OnChangeFn<SortingState> = useCallback((updater: Updater<SortingState>) => {
        const nextValue = typeof updater === 'function' ? updater(sorting) : updater;
        const sortString = nextValue
            .map((s) => (s.desc ? `-${s.id}` : s.id))
            .join(',');

        setState({
            sort: sortString || null,
        } as any);
    }, [sorting, setState]);

    // Handler for form filters
    const setFilters = useCallback((filters: Partial<Record<keyof T, any>>) => {
        const scrubbedFilters: any = { ...filters };
        let hasChanged = false;

        Object.keys(scrubbedFilters).forEach(key => {
            if (scrubbedFilters[key] === '__all__') {
                scrubbedFilters[key] = null;
            }

            if (scrubbedFilters[key] !== (state as any)[key]) {
                hasChanged = true;
            }
        });

        if (hasChanged) {
            setState(scrubbedFilters);
        }
    }, [setState, state]);

    const resetFilters = useCallback(() => {
        const nullFilters = Object.keys(filterParsers).reduce((acc, key) => {
            acc[key as keyof T] = null;
            return acc;
        }, {} as any);

        setState({
            ...nullFilters,
            sort: null,
        });
    }, [filterParsers, setState]);

    return {
        state,
        sorting,
        onSortingChange,
        setFilters,
        resetFilters,
    };
}
