import Image from "next/image"

interface PageHeaderProps {
  title: string
  description?: string
  imagePath?: string
}

export default function PageHeader({
  title,
  description,
  imagePath,
}: PageHeaderProps) {
  return (
    <section className="relative h-[40vh] min-h-[300px] bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-40 z-0">
        <Image src={imagePath || "/images/placeholder.svg"} alt={title} fill className="object-cover" priority sizes="100vw" />
      </div>
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-white text-4xl md:text-6xl font-handwriting mb-4">{title}</h1>
        {description && <p className="text-white text-xl md:text-2xl max-w-2xl mx-auto">{description}</p>}
      </div>
    </section>
  )
}
