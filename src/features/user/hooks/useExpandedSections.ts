import { type ExpandedSections } from "../profile.d"
import { useCallback, useState } from "react"

export const useExpandedSections = () => {
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    name: false,
    email: false,
    password: false
  })
  
  const toggleSection = useCallback((section : keyof ExpandedSections) =>{
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }, [])

  return { expandedSections, toggleSection }
}