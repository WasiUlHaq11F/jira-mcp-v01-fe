import { useInfiniteQuery } from '@tanstack/react-query';
import { Options } from 'nuqs';
import { useMemo } from 'react';
import { useDataTableInfiniteQueryState } from './useDataTableInfiniteQueryState';

interface UseDataTableInfiniteQueryProps<TFilters extends Record<string, any>, TData> {
    queryKey: any[];
    fetchFn: (params: any) => Promise<TData>;
    filterParsers: TFilters;
    nuqsOptions?: Options;
    pageSize?: number;
}

/**
 * Combines URL state (sort + filters) with useInfiniteQuery for infinite scroll tables.
 * Drop-in replacement for useDataTableQuery when switching from pagination to infinite scroll.
 */
export function useDataTableInfiniteQuery<TFilters extends Record<string, any>, TData>({
    queryKey,
    fetchFn,
    filterParsers,
    nuqsOptions,
    pageSize = 20,
}: UseDataTableInfiniteQueryProps<TFilters, TData>) {

    const tableState = useDataTableInfiniteQueryState(filterParsers, nuqsOptions);
    const { state } = tableState;

    // Build base params (filters + sort, no page/pageSize)
    const baseParams = useMemo(() => {
        const params: Record<string, any> = { ...state };
        Object.keys(params).forEach(key => {
            if (params[key] === '__all__' || params[key] === null || params[key] === undefined) {
                delete params[key];
            }
        });
        return params;
    }, [state]);

    const query = useInfiniteQuery({
        queryKey: [...queryKey, 'infinite-list', baseParams, pageSize],
        queryFn: ({ pageParam = 0 }) => {
            return fetchFn({ ...baseParams, page: Number(pageParam), pageSize: Number(pageSize) });
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage: any) => {
            const meta = lastPage?.data?.meta;
            if (!meta) return undefined;
            const total = Number(meta.total);
            const currentPage = Number(meta.page);
            const size = Number(meta.pageSize);
            const totalPages = Math.ceil(total / size);
            const nextPage = currentPage + 1;
            return nextPage < totalPages ? nextPage : undefined;
        },
        staleTime: 30000,
    });

    // Flatten all pages into a single array for TanStack Table
    const flatData = useMemo(() => {
        return query.data?.pages.flatMap((page: any) => page?.data?.data ?? []) ?? [];
    }, [query.data]);

    // Total from meta of the first page
    const totalRowCount = useMemo(() => {
        const firstPage = query.data?.pages[0] as any;
        return firstPage?.data?.meta?.total ?? 0;
    }, [query.data]);

    return {
        query,
        flatData,
        totalRowCount,
        tableState,
    };
}
