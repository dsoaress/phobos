import Spinner from './spinner'

export default function SplashScreen() {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <Spinner className="w-20" fill="#4f46e5" />
    </div>
  )
}
