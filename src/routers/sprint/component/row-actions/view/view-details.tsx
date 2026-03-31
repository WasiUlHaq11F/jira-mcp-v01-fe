import { formatDate } from '@/util/formatDate';
import { Button } from '@/components/ui';
import { useAppDispatch } from '@/store';
import { setSelectedObj } from '@/store/slice/selectedObjSlice';
import SPRINT_CONSTANTS from '../../../constants';
import { SprintDetail } from '../../../interface';
import { Printer } from 'lucide-react';

export const SprintViewDetails = ({ data }: { data?: SprintDetail }) => {

  const dispatch = useAppDispatch();

  return (
    <>
      {data && (
        <div className="flex flex-col h-full">

          <div className="grid grid-cols-1 md:grid-cols-1 items-start">
            <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Sprint Id</span>
          <div className="col-span-2 text-sm">
          {data?.sprintId ?? '-'}
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Name</span>
          <div className="col-span-2 text-sm">
          {data?.name ?? '-'}
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Start Date</span>
          <div className="col-span-2 text-sm">{data?.startDate ? formatDate(data?.startDate instanceof Date ? data?.startDate.toISOString() : data?.startDate, 'DATE') : '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">End Date</span>
          <div className="col-span-2 text-sm">{data?.endDate ? formatDate(data?.endDate instanceof Date ? data?.endDate.toISOString() : data?.endDate, 'DATE') : '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Status</span>
          <div className="col-span-2 text-sm">
          {data?.status ?? '-'}
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Jira Sprint Id</span>
          <div className="col-span-2 text-sm">
          {data?.jiraSprintId ?? '-'}
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
