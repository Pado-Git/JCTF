import React from "react"
import { EmblaOptionsType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"

type EmblaCarouselProps = {
  options?: EmblaOptionsType
  children: React.ReactNode
}

function EmblaCarousel({ options, children }: EmblaCarouselProps) {
  const [emblaRef] = useEmblaCarousel(options)

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y pinch-zoom gap-6">
          {React.Children.map(children, (child, i) => (
            <div className="flex-shrink-0" key={i}>
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel;