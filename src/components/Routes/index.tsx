import React , { Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import RequireAuth from '@/util/RequireAuth';
import HomePage from '@/routers/common/home'
import NotAuthPage from '@/routers/common/notAuth'
import NotFoundPage from '@/routers/common/notFound'
import ForbiddenPage from '@/routers/common/forbidden'
import { useAppDispatch, useAppSelector } from '@/store';
import { AppArea, areaConfigurations } from '@/config/areas/areaConfig';
import useCurrentArea from '@/hooks/useCurrentArea';
import { setArea } from '@/store/slice/sessionSlice';
import { Spinner } from '../ui/spinner';

  const OAuthAuthorizePage = React.lazy(() => import('@/routers/mcp/oauth/authorize'));
  
interface AppProps {
	doc: HTMLElement
}
const AppRoutes : React.FC<AppProps> = ({doc}) => {
	const {dir, isLoggedIn, user, area} = useAppSelector((state: any) => state.session);
	 doc.dir = dir  === 'rtl' ? 'rtl' : 'ltr';

   const dispatch = useAppDispatch();
   const routeArea = useCurrentArea();
   
   doc.dir = dir  === 'rtl' ? 'rtl' : 'ltr';
  
   // Sync Redux store area with current route
   useEffect(() => {
    if (routeArea !== area && routeArea !== 'public') {
     dispatch(setArea(routeArea));
    }
   }, [routeArea, area, dispatch]);     

const defaultAreaAccess: string[] = ['user:admin', 'user:projectManager', 'user:developer', 'user:qaTeam', 'user:leadership'];

 // Helper function to check if user has access to an area
 const hasAreaAccess = (areaKey: AppArea): boolean => {
  if (!user || !isLoggedIn) return false;
  
  switch(areaKey) {
    case 'default':
		return user.scope.some((role:string) => defaultAreaAccess.includes(role))

    default:
      return false;
  }
};

 // Determine which area to render routes for based on current route
 const areaToRender = isLoggedIn ? (area as AppArea) : 'public';


 // Helper function to render routes for a specific area
  const renderAreaRoutes = (areaKey: AppArea) => {
    const config = areaConfigurations[areaKey];
    const Layout = config.layout;

    return (
      <Route element={<Layout />}>
        <Route key="home" path="/" element={<HomePage />} />
        <Route key="notAuth" path="/notAuth" element={<NotAuthPage />} />
        <Route key="forbidden" path="/forbidden" element={<ForbiddenPage />} />

        {config.requiresAuth ? (
          <Route element={<RequireAuth />}>
            {config.routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  <Suspense fallback={<div className="flex items-center justify-center h-1/2"><Spinner /></div>}>
                    <route.component />
                  </Suspense>
                }
              />
            ))}
          </Route>
        ) : (
          config.routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <Suspense fallback={<div className="flex items-center justify-center h-1/2"><Spinner /></div>}>
                  <route.component />
                </Suspense>
              }
            />
          ))
        )}

        <Route key="notfound" path="*" element={<NotFoundPage />} />
      </Route>
    );
  }; 


return (	 
    <Routes>
        {/* OAuth consent page must be accessible regardless of login state */}
        <Route path="/oauth/authorize" element={
          <Suspense fallback={<div className="flex items-center justify-center h-1/2"><Spinner /></div>}>
            <OAuthAuthorizePage />
          </Suspense>
        } />
      
        {!isLoggedIn && renderAreaRoutes('public')}       
        {isLoggedIn && hasAreaAccess(areaToRender) && renderAreaRoutes(areaToRender)}
        {isLoggedIn && !hasAreaAccess(areaToRender) && renderAreaRoutes('default')}				 
    </Routes>
  );
};

export default AppRoutes;
