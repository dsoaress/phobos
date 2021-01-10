export default function Alert({ className, label }) {
  return (
    <div className="alert">
      <span className={className}>{label}</span>
    </div>
  )
}
