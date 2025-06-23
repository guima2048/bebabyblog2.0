type Props = {
  title: string
  description: string
  image: string
}

export default function ToolCard({ title, description, image }: Props) {
  return (
    <div className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer bg-white dark:bg-neutral-900">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  )
}
