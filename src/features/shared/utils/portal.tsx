import { useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: React.ReactNode
  id?: string
}

export const Portal = ({ children, id = 'portal-root' }: PortalProps) => {
  const mountNode = useMemo(() => {
    let div = document.getElementById(id)
    if (!div) {
      div = document.createElement('div')
      div.setAttribute('id', id)
      document.body.appendChild(div)
    }
    return div
  }, [id])

  useEffect(() => {
    return () => {
      if (mountNode && mountNode.childNodes.length === 0) {
        mountNode.remove()
      }
    }
  }, [mountNode])

  return createPortal(children, mountNode)
}
