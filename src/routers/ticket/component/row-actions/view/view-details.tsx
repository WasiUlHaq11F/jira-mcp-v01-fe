import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/util/formatDate';
import { Button } from '@/components/ui';
import { useAppDispatch } from '@/store';
import { setSelectedObj } from '@/store/slice/selectedObjSlice';
import TICKET_CONSTANTS from '../../../constants';
import { TicketDetail } from '../../../interface';
import { Printer } from 'lucide-react';

export const TicketViewDetails = ({ data }: { data?: TicketDetail }) => {

  const dispatch = useAppDispatch();

  return (
    <>
      {data && (
        <div className="flex flex-col h-full">

          <div className="grid grid-cols-1 md:grid-cols-1 items-start">
            <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Ticket Id</span>
          <div className="col-span-2 text-sm">
          {data?.ticketId ?? '-'}
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Title</span>
          <div className="col-span-2 text-sm">
          {data?.title ?? '-'}
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Description</span>
          <div className="col-span-2 text-sm">
          {data?.description ?? '-'}
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Assigned By Id</span>
          <div className="col-span-2 text-sm">
          {data?.assignedById ?? '-'}
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Assigned To Id</span>
          <div className="col-span-2 text-sm">
          {data?.assignedToId ?? '-'}
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Issue Type</span>
          <div className="col-span-2 text-sm">
          {data?.issueType ?? '-'}
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Status</span>
          <div className="col-span-2 text-sm">
          {data?.status ?? '-'}
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Due Date</span>
          <div className="col-span-2 text-sm">{data?.dueDate ? formatDate(data?.dueDate instanceof Date ? data?.dueDate.toISOString() : data?.dueDate, 'DATE') : '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Time Log Hours</span>
          <div className="col-span-2 text-sm">
          {data?.timeLogHour ?? '-'}
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Is Blocked</span>
          <div className="col-span-2 text-sm">
            <Badge variant={data?.isBlocked ? 'default' : 'secondary'}>{data?.isBlocked === true ? 'Yes' : 'No'}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Blocker Description</span>
          <div className="col-span-2 text-sm">
          {data?.blockerDescription ?? '-'}
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Jira Ticket Id</span>
          <div className="col-span-2 text-sm">
          {data?.jiraTicketId ?? '-'}
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Jira Link</span>
          <div className="col-span-2 text-sm">
          {data?.jiraLink ?? '-'}
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Created At</span>
          <div className="col-span-2 text-sm">{data?.createdAt ? formatDate(data?.createdAt instanceof Date ? data?.createdAt.toISOString() : data?.createdAt, 'TIMESTAMP') : '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Updated At</span>
          <div className="col-span-2 text-sm">{data?.updatedAt ? formatDate(data?.updatedAt instanceof Date ? data?.updatedAt.toISOString() : data?.updatedAt, 'TIMESTAMP') : '-'}</div>
        </div>
          </div>
        </div>
      )}
    </>
  );
};
