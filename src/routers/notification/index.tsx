import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memo } from 'react';
import { NotificationTable } from "./component/table";
import NOTIFICATION_CONSTANTS from "./constants";
import { NotificationCreateAction } from './component/header-actions';

const NotificationPage: React.FC = memo(() => {
  return (
    <div className="">
      <Card className='border-0 shadow-none md:border md:shadow '>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-0 md:px-6">
          <CardTitle className="text-xl">{NOTIFICATION_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <NotificationCreateAction />
          </div>
        </CardHeader>
        <CardContent className='px-0 md:px-6'>
        <NotificationTable />
        </CardContent>
      </Card>
    </div>
  );
});

NotificationPage.displayName = 'NotificationPage';
export default NotificationPage;