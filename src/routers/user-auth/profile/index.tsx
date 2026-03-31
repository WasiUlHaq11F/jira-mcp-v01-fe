import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppSelector } from '@/store';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, Button, Label } from '@/components/ui';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { getUserProfile } from '../service';

import MCPTokenModal from './components/mcp-token-model';
import { Link } from 'lucide-react';
import { formatDate } from '@/util/formatDate';

const UserProfilePage: React.FC = () => {
  const session = useAppSelector((state: RootState) => state.session);
  const { isLoggedIn } = session;
  const navigate = useNavigate();
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showMCPTokenModal, setShowMCPTokenModal] = useState(false);

  const { data: profileData, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => getUserProfile(session.token),
    enabled: isLoggedIn,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <CardTitle className="text-xl">Profile</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowMCPTokenModal(true)}>
              <Link className="mr-2 h-4 w-4" />
              MCP Configuration
            </Button>
           
            <Button onClick={() => navigate('/userProfile/edit')}>
              Edit Profile
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
               <div className="grid grid-cols-3 py-3 border-b">
          <Label>User Id</Label>
          <div className="col-span-2 text-sm">
          {profileData?.data?.userId ?? '-'}
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <Label>Email</Label>
          <div className="col-span-2 text-sm">
          {profileData?.data?.email ?? '-'}
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <Label>Username</Label>
          <div className="col-span-2 text-sm">
          {profileData?.data?.username ?? '-'}
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <Label>Role</Label>
          <div className="col-span-2 text-sm">
          {profileData?.data?.role ?? '-'}
          </div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <Label>Created At</Label>
          <div className="col-span-2 text-sm">{profileData?.data?.createdAt ? formatDate(profileData?.data?.createdAt instanceof Date ? profileData?.data?.createdAt.toISOString() : profileData?.data?.createdAt, 'TIMESTAMP') : '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <Label>Updated At</Label>
          <div className="col-span-2 text-sm">{profileData?.data?.updatedAt ? formatDate(profileData?.data?.updatedAt instanceof Date ? profileData?.data?.updatedAt.toISOString() : profileData?.data?.updatedAt, 'TIMESTAMP') : '-'}</div>
        </div>
          </div>
        </CardContent>
      </Card>

      
            <MCPTokenModal
        open={showMCPTokenModal}
        onOpenChange={setShowMCPTokenModal}
      />
    </div>
  );
};

export default UserProfilePage;
