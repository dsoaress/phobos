import { useState } from 'react'

import ActiveLink from '@/components/active-link'
import { useCurrentUser } from '@/hooks'

export default function Header({ title }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [, { mutate }] = useCurrentUser()
  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE'
    })
    mutate(null)
  }
  return (
    <div className="header">
      <nav>
        <div className="wrapper">
          <div className="logo">
            <button
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="sr-only">Abrir menu principal</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <img
              className="h-8 w-8"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Workflow"
            />
          </div>
          <div className={`${menuOpen ? 'block' : 'hidden'} menu`}>
            <ActiveLink activeClassName="active" href="/blog">
              <a className="nav-link" onClick={() => setMenuOpen(!menuOpen)}>
                Blog
              </a>
            </ActiveLink>
            <ActiveLink activeClassName="active" href="/pages">
              <a className="nav-link" onClick={() => setMenuOpen(!menuOpen)}>
                Páginas
              </a>
            </ActiveLink>
            <div className="logout">
              <ActiveLink href="#">
                <a onClick={handleLogout} className="nav-link">
                  Sair
                </a>
              </ActiveLink>
            </div>
            <ActiveLink href="/blog/new-post">
              <a>
                <button
                  className="small w-full"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  Novo post
                </button>
              </a>
            </ActiveLink>
          </div>
        </div>
      </nav>

      {title && (
        <header>
          <div>
            <h1>{title}</h1>
          </div>
        </header>
      )}
    </div>
  )
}
