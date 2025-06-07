type VideoEmbedProps = {
  url: string
}

export default function VideoEmbed({ url }: VideoEmbedProps) {
  if (!url) return null
  return (
    <div className="aspect-w-16 aspect-h-9 w-full my-4">
      <iframe
        src={url}
        frameBorder="0"
        allowFullScreen
        className="w-full h-64"
        title="Vídeo do post"
      />
    </div>
  )
}
