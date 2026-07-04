export default function DataTable({
  rows,
}: {
  rows: [string, string][];
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full border-collapse text-sm">
        <tbody>
          {rows.map(([label, value], i) => (
            <tr
              key={label}
              className={i % 2 === 0 ? "bg-paper" : "bg-canvas/40"}
            >
              <td className="px-4 py-2.5 font-sans text-ink-soft">{label}</td>
              <td className="px-4 py-2.5 text-right font-mono font-medium text-ink">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
