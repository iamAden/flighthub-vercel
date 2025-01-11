import Image from 'next/image'

type Airline = 'AirAsia' | 'BatikAir' | 'Malaysia Airlines';

const airlineLogo: Record<Airline, string> = {
  'AirAsia': '/placeholder.svg?height=40&width=40',
  'BatikAir': '/placeholder.svg?height=40&width=40',
  'Malaysia Airlines': '/placeholder.svg?height=40&width=40',
}

export function FlightLogo({ airline }: { airline: Airline }) {
  return (
    <div className="w-10 h-10">
      <Image
        src={airlineLogo[airline]}
        alt={`${airline} logo`}
        width={40}
        height={40}
        className="object-contain"
      />
    </div>
  )
}

