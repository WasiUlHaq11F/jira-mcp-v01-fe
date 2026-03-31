import { DataTable } from '@/components/DataTable';
import { DataTableSettingsColumns } from '@/components/DataTable/components/data-table-settings-columns';
import { Spinner } from '@/components/ui/spinner';
import { useDataTableManager } from '@/hooks/data-table/useDataTableManager';
import { useDataTableQuery } from '@/hooks/data-table/useDataTableQuery';
import { parseAsString } from 'nuqs';
import { lazy, memo, Suspense, useMemo } from 'react';
import TICKET_SPRINT_CONSTANTS from "../../constants";
import { ticketSprintTableConfigDefault } from '../../data/ticketSprintTableConfigDefault';
import { getTicketSprints } from '../../service';
import { ticketSprintGetColumns } from './columns';

const TicketSprintCreate = lazy(() => import('../header-actions/create'));
const TicketSprintUpdate = lazy(() => import('../row-actions/update'));
const TicketSprintDelete = lazy(() => import('../row-actions/delete'));
const TicketSprintView = lazy(() => import('../row-actions/view'));

export const TicketSprintTable: React.FC = memo(() => {

  const {
    tableConfiguration,
    columnVisibility,
    tableHandlers
  } = useDataTableManager(TICKET_SPRINT_CONSTANTS.TABLE_CONFIG_KEY, ticketSprintTableConfigDefault);

  const multiSortEnabled = tableConfiguration?.multiSort ?? false;

  // 1. Generate columns with multiSortEnabled
  const columns = useMemo(() => ticketSprintGetColumns(multiSortEnabled), [multiSortEnabled]);

  // 2. Manage URL-synced table state and API data fetching
  const {
    query: { data: entityResponse, isFetching: isLoading, isError, error, refetch },
    tableState: { state: urlParams, pagination, sorting, onPaginationChange, onSortingChange, setFilters, resetFilters },
  } = useDataTableQuery({
    queryKey: [TICKET_SPRINT_CONSTANTS.QUERY_KEY],
    fetchFn: getTicketSprints,
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
        entityName={TICKET_SPRINT_CONSTANTS.ENTITY_NAME}
        renderToolbar={() => <>
          {/* No Search form only Column Config */}
          <DataTableSettingsColumns
            variant="toolbar"
            columnVisibility={columnVisibility}
            defaultTableConfig={ticketSprintTableConfigDefault}
            onColumnVisibilityChange={tableHandlers.onColumnToggle}
            onReset={tableHandlers.onReset}
          />
        </>}
      />
      <Suspense fallback={<Spinner />}>

				<TicketSprintCreate />
				<TicketSprintUpdate />
				<TicketSprintDelete />
				<TicketSprintView />

      </Suspense>
    </>
  );

});

TicketSprintTable.displayName = 'TicketSprintTable';

export default TicketSprintTable;
