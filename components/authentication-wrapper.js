import Meta from './meta'
export default function AuthenticationWrapper({ children, title }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full -mt-20 space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {title}
            </h2>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}
