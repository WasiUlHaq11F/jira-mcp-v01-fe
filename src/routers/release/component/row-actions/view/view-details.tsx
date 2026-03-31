import { formatDate } from '@/util/formatDate';
import { Button } from '@/components/ui';
import { useAppDispatch } from '@/store';
import { setSelectedObj } from '@/store/slice/selectedObjSlice';
import RELEASE_CONSTANTS from '../../../constants';
import { ReleaseDetail } from '../../../interface';
import { Printer } from 'lucide-react';

export const ReleaseViewDetails = ({ data }: { data?: ReleaseDetail }) => {

  const dispatch = useAppDispatch();

  return (
    <>
      {data && (
        <div className="flex flex-col h-full">

          <div className="grid grid-cols-1 md:grid-cols-1 items-start">
            <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Release Id</span>
          <div className="col-span-2 text-sm">
          {data?.releaseId ?? '-'}
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Name</span>
          <div className="col-span-2 text-sm">
          {data?.name ?? '-'}
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Version Number</span>
          <div className="col-span-2 text-sm">
          {data?.versionNumber ?? '-'}
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Release Date</span>
          <div className="col-span-2 text-sm">{data?.releaseDate ? formatDate(data?.releaseDate instanceof Date ? data?.releaseDate.toISOString() : data?.releaseDate, 'DATE') : '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Status</span>
          <div className="col-span-2 text-sm">
          {data?.status ?? '-'}
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Jira Release Id</span>
          <div className="col-span-2 text-sm">
          {data?.jiraReleaseId ?? '-'}
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
