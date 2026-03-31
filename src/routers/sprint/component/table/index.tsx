import { DataTable } from '@/components/DataTable';
import { DataTableSettingsColumns } from '@/components/DataTable/components/data-table-settings-columns';
import { Spinner } from '@/components/ui/spinner';
import { useDataTableManager } from '@/hooks/data-table/useDataTableManager';
import { useDataTableQuery } from '@/hooks/data-table/useDataTableQuery';
import { parseAsString } from 'nuqs';
import { lazy, memo, Suspense, useMemo } from 'react';
import SPRINT_CONSTANTS from "../../constants";
import { sprintTableConfigDefault } from '../../data/sprintTableConfigDefault';
import { getSprints } from '../../service';
import { sprintGetColumns } from './columns';

const SprintCreate = lazy(() => import('../header-actions/create'));
const SprintUpdate = lazy(() => import('../row-actions/update'));
const SprintDelete = lazy(() => import('../row-actions/delete'));
const SprintView = lazy(() => import('../row-actions/view'));

export const SprintTable: React.FC = memo(() => {

  const {
    tableConfiguration,
    columnVisibility,
    tableHandlers
  } = useDataTableManager(SPRINT_CONSTANTS.TABLE_CONFIG_KEY, sprintTableConfigDefault);

  const multiSortEnabled = tableConfiguration?.multiSort ?? false;

  // 1. Generate columns with multiSortEnabled
  const columns = useMemo(() => sprintGetColumns(multiSortEnabled), [multiSortEnabled]);

  // 2. Manage URL-synced table state and API data fetching
  const {
    query: { data: entityResponse, isFetching: isLoading, isError, error, refetch },
    tableState: { state: urlParams, pagination, sorting, onPaginationChange, onSortingChange, setFilters, resetFilters },
  } = useDataTableQuery({
    queryKey: [SPRINT_CONSTANTS.QUERY_KEY],
    fetchFn: getSprints,
    defaultPageSize: -1,
    filterParsers: {

    },
  });

  // 3. Derived UI state
  const data = entityResponse?.data?.data || [];
  const rowCount = entityResponse?.data?.meta?.total || 0;
  const pageCount = pagination.pageSize === -1 ? 1 : Math.ceil(rowCount / pagination.pageSize);

  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        pageCount={pageCount}
        rowCount={rowCount}
        state={{
          pagination,
          sorting,
          columnVisibility,
        }}
        onPaginationChange={onPaginationChange}
        onSortingChange={onSortingChange}
        onColumnVisibilityChange={tableHandlers.onColumnVisibilityChange}
        isLoading={isLoading}
        isError={isError}
        errorMessage={error instanceof Error ? error.message : undefined}
        onRetry={refetch}
        enableMultiSort={multiSortEnabled}
        pageSizeOptions={[]}
        entityName={SPRINT_CONSTANTS.ENTITY_NAME}
        renderToolbar={() => <>
          {/* No Search form only Column Config */}
          <DataTableSettingsColumns
            variant="toolbar"
            columnVisibility={columnVisibility}
            defaultTableConfig={sprintTableConfigDefault}
            onColumnVisibilityChange={tableHandlers.onColumnToggle}
            onReset={tableHandlers.onReset}
          />
        </>}
      />
      <Suspense fallback={<Spinner />}>

				<SprintCreate />
				<SprintUpdate />
				<SprintDelete />
				<SprintView />

      </Suspense>
    </>
  );

});

SprintTable.displayName = 'SprintTable';

export default SprintTable;
