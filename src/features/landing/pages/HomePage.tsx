import { WelcomeBanner, StoreHistory, PopularItems, LandingFooter } from '../ui';

export const HomePage = () => {
  return (
    <div className="min-h-screen">
      <WelcomeBanner />
      <StoreHistory />
      <PopularItems />
      <LandingFooter />
    </div>
  );
};