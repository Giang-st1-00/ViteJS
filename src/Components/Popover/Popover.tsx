import { arrow, FloatingPortal, offset, type Placement, shift, useFloating } from '@floating-ui/react-dom-interactions'
import { motion } from 'framer-motion'
import React, { ElementType, useId, useRef, useState } from 'react'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  //thay doi thẻ tuy chon
  placement?: Placement
  // bó lại và vị trí đứng .
}

export default function Popover({
  children,
  renderPopover,
  className,
  as: Element = 'div',
  initialOpen = false,
  placement = 'bottom-end'
}: Props) {
  const [open, setOpen] = useState(initialOpen || false)
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, reference, floating, strategy, middlewareData } = useFloating({
    middleware: [offset(6), shift(), arrow({ element: arrowRef })],
    placement: placement
  })
  const showPopover = () => {
    setOpen(true)
  }
  const hidePopover = () => {
    setOpen(false)
  }
  const id = useId()

  return (
    <Element className={className} ref={reference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {children}
      <FloatingPortal id={id}>
        {open && (
          <motion.div
            ref={floating}
            style={{
              position: strategy,
              //strategy : chien dich xem thu dung absolute hay fixed
              top: y ?? 0,
              left: x ?? 0,
              width: 'max-content',
              transformOrigin: `${middlewareData.arrow?.x}px top`
            }}
            initial={{ opacity: 0, transform: 'scale(0)' }}
            animate={{ opacity: 1, transform: 'scale(1)' }}
            exit={{ opacity: 0, transform: 'scale(0)' }}
            transition={{ duration: 0.3 }}
          >
            <span
              ref={arrowRef}
              className='border-x-transparent border-t-transparent border-b-white border-[11px] absolute translate-y-[-95%] z-10'
              style={{
                left: middlewareData.arrow?.x,
                top: middlewareData.arrow?.y
              }}
            />
            {/* span > hien mui ten */}
            {renderPopover}
          </motion.div>
        )}
      </FloatingPortal>
    </Element>
  )
}
