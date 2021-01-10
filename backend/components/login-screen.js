import Link from 'next/link'

import LoginWrapper from '@/components/login-wrapper'

export default function Login() {
  return (
    <LoginWrapper title="Você não está logado">
      <div>
        <Link href="/login">
          <a>
            <button>Frazer login</button>
          </a>
        </Link>
      </div>
    </LoginWrapper>
  )
}
