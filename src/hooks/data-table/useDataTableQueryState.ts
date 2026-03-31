import {
    useQueryStates,
    parseAsInteger,
    parseAsString,
    Options
} from 'nuqs';
import { useCallback, useMemo } from 'react';
import { PaginationState, SortingState, OnChangeFn, Updater } from '@tanstack/react-table';

/**
 * Common parsers for table state
 */
export const commonTableParsers = {
    page: parseAsInteger.withDefault(0),
    pageSize: parseAsInteger.withDefault(10),
    sort: parseAsString.withDefault(''),
};

/**
 * Reusable hook to sync DataTable state with URL query strings using nuqs.
**/
export function useDataTableQueryState<T extends Record<string, any>>(
    filterParsers: T,
    options: Options = { history: 'push', shallow: true },
    defaultPageSize: number = 10
) {
    // Combine common parsers with module-specific filters
    const parsers = useMemo(() => ({
        ...commonTableParsers,
        pageSize: parseAsInteger.withDefault(defaultPageSize),
        ...filterParsers,
    }), [filterParsers, defaultPageSize]);

    const [state, setState] = useQueryStates(parsers, options);

    // Helper to convert URL state to TanStack Table pagination state
    const pagination: PaginationState = useMemo(() => ({
        pageIndex: (state as any).page ?? 0,
        pageSize: (state as any).pageSize ?? defaultPageSize,
    }), [(state as any).page, (state as any).pageSize]);

    // Helper to convert URL sort string to TanStack Table sorting state
    const sorting: SortingState = useMemo(() => {
        const sort = (state as any).sort;
        if (!sort || typeof sort !== 'string') return [];

        return sort.split(',').map((s: string) => {
            const desc = s.startsWith('-');
            const id = desc ? s.slice(1) : s;
            return { id, desc };
        });
    }, [(state as any).sort]);

    // Handler for TanStack Table pagination change
    const onPaginationChange: OnChangeFn<PaginationState> = useCallback((updater: Updater<PaginationState>) => {
        const nextValue = typeof updater === 'function' ? updater(pagination) : updater;

        // When changing page, we also want to ensure no "__all__" values are left in the URL
        const scrubbedState: any = {
            page: nextValue.pageIndex,
            pageSize: nextValue.pageSize,
        };

        // If there are any current filters that are "__all__", we set them to null during pagination change
        Object.keys(state).forEach(key => {
            if ((state as any)[key] === '__all__') {
                scrubbedState[key] = null;
            }
        });

        setState(scrubbedState);
    }, [pagination, setState, state]);

    // Handler for TanStack Table sorting change
    const onSortingChange: OnChangeFn<SortingState> = useCallback((updater: Updater<SortingState>) => {
        const nextValue = typeof updater === 'function' ? updater(sorting) : updater;
        const sortString = nextValue
            .map((s) => (s.desc ? `-${s.id}` : s.id))
            .join(',');

        setState({
            sort: sortString || null,
            page: 0, // Reset to first page on sort change
        } as any);
    }, [sorting, setState]);

    // Handler for form filters
    const setFilters = useCallback((filters: Partial<Record<keyof T, any>>) => {
        const scrubbedFilters: any = { ...filters };
        let hasChanged = false;

        // 1. Scrub "__all__" values (convert to null)
        // 2. Check if anything actually changed compared to current state
        Object.keys(scrubbedFilters).forEach(key => {
            if (scrubbedFilters[key] === '__all__') {
                scrubbedFilters[key] = null;
            }

            if (scrubbedFilters[key] !== (state as any)[key]) {
                hasChanged = true;
            }
        });

        // Only update state if there's a real change
        if (hasChanged) {
            setState({
                ...scrubbedFilters,
                page: 0, // Reset to first page only on real filter change
            } as any);
        }
    }, [setState, state]);

    const resetFilters = useCallback(() => {
        const nullFilters = Object.keys(filterParsers).reduce((acc, key) => {
            acc[key as keyof T] = null;
            return acc;
        }, {} as any);

        setState({
            ...nullFilters,
            page: 0,
            sort: null,
        });
    }, [filterParsers, setState]);

    return {
        state,
        pagination,
        sorting,
        onPaginationChange,
        onSortingChange,
        setFilters,
        resetFilters,
    };
}
