import { WelcomeBanner, StoreHistory, PopularItems, LandingFooter } from '../ui'
import { useAuthContext } from '../../auth/hooks/useAuthContext';

export const HomePage = () => {
  const { user } = useAuthContext()

  return (
    <div className="min-h-screen">
      <WelcomeBanner isLogged={user.isLoggedin} />
      <StoreHistory />
      <PopularItems isLogged={user.isLoggedin} />
      <LandingFooter />
    </div>
  );
};