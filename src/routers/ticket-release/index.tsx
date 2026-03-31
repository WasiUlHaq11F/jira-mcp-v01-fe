import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memo } from 'react';
import { TicketReleaseTable } from "./component/table";
import TICKET_RELEASE_CONSTANTS from "./constants";
import { TicketReleaseCreateAction } from './component/header-actions';

const TicketReleasePage: React.FC = memo(() => {
  return (
    <div className="">
      <Card className='border-0 shadow-none md:border md:shadow '>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-0 md:px-6">
          <CardTitle className="text-xl">{TICKET_RELEASE_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <TicketReleaseCreateAction />
          </div>
        </CardHeader>
        <CardContent className='px-0 md:px-6'>
        <TicketReleaseTable />
        </CardContent>
      </Card>
    </div>
  );
});

TicketReleasePage.displayName = 'TicketReleasePage';
export default TicketReleasePage;