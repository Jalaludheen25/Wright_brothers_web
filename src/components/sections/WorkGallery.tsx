import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { StaticImage } from "@/components/ui/ParallaxImage";
import type { ImageKey } from "@/lib/images";

type Shot = { image: ImageKey; alt: string; /** Spans two columns. */ wide?: boolean };

/**
 * Completed work that has no case study behind it yet — client photography,
 * shown as a gallery rather than written up. Deliberately captionless: we know
 * what is in each frame, not the client, the date or the contract value.
 */
const SHOTS: Shot[] = [
  {
    image: "wb-retail-wall",
    alt: "A full-height perfume display wall running the length of a retail floor",
    wide: true,
  },
  {
    image: "wb-retail-shelving",
    alt: "Backlit retail shelving and display joinery in a perfume store",
  },
  {
    image: "wb-retail-lounge",
    alt: "Seating set against floor-to-ceiling black display shelving",
  },
  {
    image: "wb-retail-pergola",
    alt: "A timber pergola structure over retail display units",
  },
  {
    image: "wb-retail-display",
    alt: "Freestanding display plinths on a polished retail floor",
  },
  {
    image: "wb-armaf-lobby",
    alt: "A double-height entrance lobby with a coffered ceiling and feature stair",
    wide: true,
  },
  {
    image: "wb-office-reception",
    alt: "An office reception counter with concealed cove lighting",
  },
  {
    image: "wb-office-artwork-bar",
    alt: "A breakout bar and high stools beneath a run of framed artwork",
  },
  {
    image: "wb-lounge-pendants",
    alt: "Clustered glass pendants above a lounge in an exposed-services office",
  },
  {
    image: "wb-lounge-wide",
    alt: "An office lounge of leather seating, planting and glazed partitions",
  },
  {
    image: "wb-office-timber-frame",
    alt: "Timber-framed glazed partitions enclosing a breakout area",
  },
  {
    image: "wb-cosmo-store",
    alt: "Retail shelving and signage under exposed services in a cosmetics store",
  },
  {
    image: "wb-pantry-bar",
    alt: "A staff pantry with dark joinery and pendant lighting",
  },
  {
    image: "wb-office-quote-wall",
    alt: "A printed feature wall beside a high table and stools",
  },
  {
    image: "wb-office-exterior",
    alt: "The exterior of a completed commercial unit at street level",
    wide: true,
  },
];

export function WorkGallery() {
  return (
    <RevealGroup
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      stagger={0.06}
    >
      {SHOTS.map((shot) => (
        <RevealItem
          key={shot.image}
          className={shot.wide ? "sm:col-span-2 lg:col-span-2" : undefined}
        >
          <StaticImage
            image={shot.image}
            alt={shot.alt}
            className={shot.wide ? "aspect-[16/9] w-full" : "aspect-[4/3] w-full"}
            sizes={
              shot.wide
                ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 60vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
            }
          />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
