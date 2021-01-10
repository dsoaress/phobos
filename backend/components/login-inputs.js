export function Email() {
  return (
    <div>
      <label htmlFor="email" className="sr-only">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        required
      />
    </div>
  )
}

export function Password() {
  return (
    <div>
      <label htmlFor="email" className="sr-only">
        Senha
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Senha"
        required
      />
    </div>
  )
}
