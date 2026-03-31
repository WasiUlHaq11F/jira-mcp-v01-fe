import { formatDate } from '@/util/formatDate';
import { Button } from '@/components/ui';
import { useAppDispatch } from '@/store';
import { setSelectedObj } from '@/store/slice/selectedObjSlice';
import USER_CONSTANTS from '../../../constants';
import { UserDetail } from '../../../interface';
import { Printer } from 'lucide-react';

export const UserViewDetails = ({ data }: { data?: UserDetail }) => {

  const dispatch = useAppDispatch();

  return (
    <>
      {data && (
        <div className="flex flex-col h-full">

          <div className="grid grid-cols-1 md:grid-cols-1 items-start">
            <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">User Id</span>
          <div className="col-span-2 text-sm">
          {data?.userId ?? '-'}
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Email</span>
          <div className="col-span-2 text-sm">
          {data?.email ?? '-'}
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Username</span>
          <div className="col-span-2 text-sm">
          {data?.username ?? '-'}
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Role</span>
          <div className="col-span-2 text-sm">
          {data?.role ?? '-'}
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
