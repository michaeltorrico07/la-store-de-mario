import { ProfileSidebar, PersonalDataTab, OrderHistoryTab, TicketModal } from '../ui';
import { useAuthContext } from '../../auth/hooks/useAuthContext';
import { useUserOrders, useProfileTab, useTicket } from '../hooks';
import { Background } from '../../shared';

export const Profile = () => {
  const { selectedTicket, showTicket, showTicketModal, closeTicket } = useTicket();

  const { user } = useAuthContext()

  const { activeTab, handleTabChange } = useProfileTab();

  const { data, handleCall, loading } = useUserOrders()

  return (
    <>
      <Background className="bg-gray-100">
        <div className="max-w-full mx-auto px-4 pt-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Mi cuenta</h1>
          </div>
          <div className="max-w-7xl mx-auto mb-10">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-80 flex-shrink-0">
                <ProfileSidebar
                  user={{
                    name: user?.name ?? '',
                    rol: user?.rol ?? 'USER'
                  }}
                  handleCall={handleCall}
                  activeTab={activeTab}
                  handleTabChange={handleTabChange}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  key="historial"
                  className="animate-in fade-in slide-in-from-right-5 duration-500 ease-out"
                >
                  {user && (activeTab === 'historial' ? (
                    <OrderHistoryTab
                      orderHistory={data ?? []}
                      loading={loading}
                      showTicketModal={showTicketModal}
                    />) : (
                    <PersonalDataTab user={user} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Background>
      {/* Modal del ticket */}
      <TicketModal
        selectedTicket={selectedTicket}
        showTicket={showTicket}
        closeTicket={closeTicket}
        user={user?.name ?? ''}
      />
    </>
  );
};
