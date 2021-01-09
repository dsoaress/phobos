export function Input({ label, labelSrOnly, id, ...props }) {
  return (
    <div>
      {Label(id, label, labelSrOnly)}
      <input id={id} name={id} placeholder={labelSrOnly && label} {...props} />
    </div>
  )
}

export function Select({ label, labelSrOnly, id, options, ...props }) {
  return (
    <div>
      {Label(id, label, labelSrOnly)}
      <select id={id} name={id} {...props}>
        {options.map((item, i) => (
          <option value={item.value} key={i}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export function Checkbox({ label, id, ...props }) {
  return (
    <div>
      <input type="checkbox" id={id} name={id} {...props} />
      {Label(id, label)}
    </div>
  )
}

export function Textarea({ label, labelSrOnly, id, ...props }) {
  return (
    <div>
      {Label(id, label, labelSrOnly)}
      <textarea id={id} name={id} {...props} />
    </div>
  )
}

function Label(id, label, labelSrOnly) {
  return (
    <label htmlFor={id} className={`${labelSrOnly && 'sr-only'}`}>
      {label}
    </label>
  )
}
