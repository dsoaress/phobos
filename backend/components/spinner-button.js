import Spinner from '@/components/spinner'

export default function SpinnerButton({ label, loading }) {
  return (
    <div>
      <button type="submit" className="relative w-full">
        {loading && (
          <Spinner className="absolute left-4 top-4 fill-current w-5" />
        )}
        {label}
      </button>
    </div>
  )
}
