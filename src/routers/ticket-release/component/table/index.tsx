import { DataTable } from '@/components/DataTable';
import { DataTableSettingsColumns } from '@/components/DataTable/components/data-table-settings-columns';
import { Spinner } from '@/components/ui/spinner';
import { useDataTableManager } from '@/hooks/data-table/useDataTableManager';
import { useDataTableQuery } from '@/hooks/data-table/useDataTableQuery';
import { parseAsString } from 'nuqs';
import { lazy, memo, Suspense, useMemo } from 'react';
import TICKET_RELEASE_CONSTANTS from "../../constants";
import { ticketReleaseTableConfigDefault } from '../../data/ticketReleaseTableConfigDefault';
import { getTicketReleases } from '../../service';
import { ticketReleaseGetColumns } from './columns';

const TicketReleaseCreate = lazy(() => import('../header-actions/create'));
const TicketReleaseUpdate = lazy(() => import('../row-actions/update'));
const TicketReleaseDelete = lazy(() => import('../row-actions/delete'));
const TicketReleaseView = lazy(() => import('../row-actions/view'));

export const TicketReleaseTable: React.FC = memo(() => {

  const {
    tableConfiguration,
    columnVisibility,
    tableHandlers
  } = useDataTableManager(TICKET_RELEASE_CONSTANTS.TABLE_CONFIG_KEY, ticketReleaseTableConfigDefault);

  const multiSortEnabled = tableConfiguration?.multiSort ?? false;

  // 1. Generate columns with multiSortEnabled
  const columns = useMemo(() => ticketReleaseGetColumns(multiSortEnabled), [multiSortEnabled]);

  // 2. Manage URL-synced table state and API data fetching
  const {
    query: { data: entityResponse, isFetching: isLoading, isError, error, refetch },
    tableState: { state: urlParams, pagination, sorting, onPaginationChange, onSortingChange, setFilters, resetFilters },
  } = useDataTableQuery({
    queryKey: [TICKET_RELEASE_CONSTANTS.QUERY_KEY],
    fetchFn: getTicketReleases,
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
        entityName={TICKET_RELEASE_CONSTANTS.ENTITY_NAME}
        renderToolbar={() => <>
          {/* No Search form only Column Config */}
          <DataTableSettingsColumns
            variant="toolbar"
            columnVisibility={columnVisibility}
            defaultTableConfig={ticketReleaseTableConfigDefault}
            onColumnVisibilityChange={tableHandlers.onColumnToggle}
            onReset={tableHandlers.onReset}
          />
        </>}
      />
      <Suspense fallback={<Spinner />}>

				<TicketReleaseCreate />
				<TicketReleaseUpdate />
				<TicketReleaseDelete />
				<TicketReleaseView />

      </Suspense>
    </>
  );

});

TicketReleaseTable.displayName = 'TicketReleaseTable';

export default TicketReleaseTable;
