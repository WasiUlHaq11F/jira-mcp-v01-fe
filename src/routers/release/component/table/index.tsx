import { DataTable } from '@/components/DataTable';
import { DataTableSettingsColumns } from '@/components/DataTable/components/data-table-settings-columns';
import { Spinner } from '@/components/ui/spinner';
import { useDataTableManager } from '@/hooks/data-table/useDataTableManager';
import { useDataTableQuery } from '@/hooks/data-table/useDataTableQuery';
import { parseAsString } from 'nuqs';
import { lazy, memo, Suspense, useMemo } from 'react';
import RELEASE_CONSTANTS from "../../constants";
import { releaseTableConfigDefault } from '../../data/releaseTableConfigDefault';
import { getReleases } from '../../service';
import { releaseGetColumns } from './columns';

const ReleaseCreate = lazy(() => import('../header-actions/create'));
const ReleaseUpdate = lazy(() => import('../row-actions/update'));
const ReleaseDelete = lazy(() => import('../row-actions/delete'));
const ReleaseView = lazy(() => import('../row-actions/view'));

export const ReleaseTable: React.FC = memo(() => {

  const {
    tableConfiguration,
    columnVisibility,
    tableHandlers
  } = useDataTableManager(RELEASE_CONSTANTS.TABLE_CONFIG_KEY, releaseTableConfigDefault);

  const multiSortEnabled = tableConfiguration?.multiSort ?? false;

  // 1. Generate columns with multiSortEnabled
  const columns = useMemo(() => releaseGetColumns(multiSortEnabled), [multiSortEnabled]);

  // 2. Manage URL-synced table state and API data fetching
  const {
    query: { data: entityResponse, isFetching: isLoading, isError, error, refetch },
    tableState: { state: urlParams, pagination, sorting, onPaginationChange, onSortingChange, setFilters, resetFilters },
  } = useDataTableQuery({
    queryKey: [RELEASE_CONSTANTS.QUERY_KEY],
    fetchFn: getReleases,
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
        entityName={RELEASE_CONSTANTS.ENTITY_NAME}
        renderToolbar={() => <>
          {/* No Search form only Column Config */}
          <DataTableSettingsColumns
            variant="toolbar"
            columnVisibility={columnVisibility}
            defaultTableConfig={releaseTableConfigDefault}
            onColumnVisibilityChange={tableHandlers.onColumnToggle}
            onReset={tableHandlers.onReset}
          />
        </>}
      />
      <Suspense fallback={<Spinner />}>

				<ReleaseCreate />
				<ReleaseUpdate />
				<ReleaseDelete />
				<ReleaseView />

      </Suspense>
    </>
  );

});

ReleaseTable.displayName = 'ReleaseTable';

export default ReleaseTable;
