import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memo } from 'react';
import { SprintTable } from "./component/table";
import SPRINT_CONSTANTS from "./constants";
import { SprintCreateAction } from './component/header-actions';

const SprintPage: React.FC = memo(() => {
  return (
    <div className="">
      <Card className='border-0 shadow-none md:border md:shadow '>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-0 md:px-6">
          <CardTitle className="text-xl">{SPRINT_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <SprintCreateAction />
          </div>
        </CardHeader>
        <CardContent className='px-0 md:px-6'>
        <SprintTable />
        </CardContent>
      </Card>
    </div>
  );
});

SprintPage.displayName = 'SprintPage';
export default SprintPage;