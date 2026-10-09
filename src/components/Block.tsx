interface BlockProps {
  value: string | null
  onClick: () => void
  disabled: boolean
  label: string
}

function Block({ value, onClick, disabled, label }: BlockProps) {
  return (
    <button
      className="block"
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`${label}${value ? `: ${value}` : ': empty'}`}
    >
      {value}
    </button>
  )
}

export default Block