import { useCallback, useState } from "react";

export const useProfileTab = () => {
  const [activeTab, setActiveTab] = useState<string>('datos')

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab)
  }, [])

  return { activeTab, handleTabChange }
}