export function Name() {
  return (
    <div>
      <label htmlFor="name" className="sr-only">
        Nome
      </label>
      <input type="text" id="name" name="name" placeholder="Nome" required />
    </div>
  )
}

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
