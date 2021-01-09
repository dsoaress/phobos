import Meta from '@/components/meta'
export default function AuthenticationWrapper({ children, title }) {
  return (
    <>
      <Meta />
      <div className="authentication-wrapper">
        <div className="wrapper">
          <div>
            <img
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2>{title}</h2>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}
