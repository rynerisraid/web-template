export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-muted rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  )
}
