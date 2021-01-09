import Link from 'next/link'

import AuthenticationWrapper from '@/components/authentication-wrapper'

export default function Login() {
  return (
    <AuthenticationWrapper title="Você não está logado">
      <div>
        <Link href="/login">
          <a>
            <button>Frazer login</button>
          </a>
        </Link>
      </div>
    </AuthenticationWrapper>
  )
}
