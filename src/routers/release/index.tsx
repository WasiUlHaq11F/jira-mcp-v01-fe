import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memo } from 'react';
import { ReleaseTable } from "./component/table";
import RELEASE_CONSTANTS from "./constants";
import { ReleaseCreateAction } from './component/header-actions';

const ReleasePage: React.FC = memo(() => {
  return (
    <div className="">
      <Card className='border-0 shadow-none md:border md:shadow '>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-0 md:px-6">
          <CardTitle className="text-xl">{RELEASE_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <ReleaseCreateAction />
          </div>
        </CardHeader>
        <CardContent className='px-0 md:px-6'>
        <ReleaseTable />
        </CardContent>
      </Card>
    </div>
  );
});

ReleasePage.displayName = 'ReleasePage';
export default ReleasePage;