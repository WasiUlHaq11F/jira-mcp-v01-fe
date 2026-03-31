import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memo } from 'react';
import { UserTable } from "./component/table";
import USER_CONSTANTS from "./constants";
import { UserCreateAction } from './component/header-actions';

const UserPage: React.FC = memo(() => {
  return (
    <div className="">
      <Card className='border-0 shadow-none md:border md:shadow '>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-0 md:px-6">
          <CardTitle className="text-xl">{USER_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <UserCreateAction />
          </div>
        </CardHeader>
        <CardContent className='px-0 md:px-6'>
        <UserTable />
        </CardContent>
      </Card>
    </div>
  );
});

UserPage.displayName = 'UserPage';
export default UserPage;