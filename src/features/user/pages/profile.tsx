import { useProfile } from '../hooks/useProfile';
import { ProfileSidebar } from '../ui/ProfileSidebar';
import { PersonalDataTab } from '../ui/PersonalDataTab';
import { OrderHistoryTab } from '../ui/OrderHistoryTab';
import { TicketModal } from '../ui/TicketModal';
import { Navbar } from '../../shared/ui/navbar'; // Importar la Navbar
import { useUserOrders } from '../hooks/useUserOrders';

export const Profile = () => {
  const {
    activeTab,
    expandedSections,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    selectedTicket,
    showTicket,
    userData,
    setActiveTab,
    toggleSection,
    setShowCurrentPassword,
    setShowNewPassword,
    setShowConfirmPassword,
    showTicketModal,
    closeTicket
  } = useProfile();
  const { data } = useUserOrders()
  

  return (
    <>
      {/* Navbar */}
      <Navbar />

      <div className="min-h-screen bg-gray-100 pt-20 pb-8">
        <div className="max-w-full mx-auto px-4 pt-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Mi cuenta</h1>
          </div>

          {activeTab === 'historial' ? (
            // Layout especial para historial - Más ancho
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-80 flex-shrink-0">
                  <ProfileSidebar
                    userData={{
                      name: userData.name ?? '',
                      dni: userData.dni ?? ''
                    }}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    key="historial"
                    className="animate-in fade-in slide-in-from-right-5 duration-500 ease-out"
                  >
                    <OrderHistoryTab
                      orderHistory={data ?? []}
                      showTicketModal={showTicketModal}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Layout normal para otros tabs
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <ProfileSidebar
                    userData={{
                      name: userData.name ?? '',
                      dni: userData.dni ?? ''
                    }}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                </div>
                <div className="lg:col-span-2">
                  {activeTab === 'datos' && (
                    <div
                      key="datos"
                      className="animate-in fade-in slide-in-from-left-5 duration-500 ease-out"
                    >
                      <PersonalDataTab
                        userData={{
                          name: userData.name ?? '',
                          email: userData.email ?? '',
                          lastName: userData.lastName ?? ''
                        }}
                        expandedSections={expandedSections}
                        toggleSection={toggleSection}
                        showCurrentPassword={showCurrentPassword}
                        showNewPassword={showNewPassword}
                        showConfirmPassword={showConfirmPassword}
                        setShowCurrentPassword={setShowCurrentPassword}
                        setShowNewPassword={setShowNewPassword}
                        setShowConfirmPassword={setShowConfirmPassword}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal del ticket */}
        <TicketModal
          selectedTicket={selectedTicket}
          showTicket={showTicket}
          closeTicket={closeTicket}
        />
      </div>
    </>
  );
};
