export const CounterButton = ({
  count,
  onIncrement,
}: {
  count: number
  onIncrement: () => void
}) => {
  return (
    <button className="counter" onClick={onIncrement}>
      Count is {count}
    </button>
  )
}

