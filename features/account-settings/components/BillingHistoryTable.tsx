export default function BillingHistoryTable() {
  const history = [
    { date: "15 Sept, 2025", amount: "NGN25,000" },
    { date: "15 Aug, 2025", amount: "NGN25,000" },
  ];

  return (
    <div className="mt-8 border border-[#E4E7EC] rounded-[24px]">
      <h2 className="p-6 text-xl font-semibold text-[#344054]">
        Billing history
      </h2>
      <table className="w-full">
        <thead>
          <tr className="text-sm text-[#667185] text-left border-y border-[#E4E7EC]">
            <th className="px-6 py-4">DATE</th>
            <th className="px-6 py-4">AMOUNT</th>
            <th className="px-6 py-4"></th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, i) => (
            <tr key={i} className="">
              <td className="px-6 py-4 text-base text-[#344054] font-normal">
                {entry.date}
              </td>
              <td className="px-6 py-4 text-base text-[#344054] font-normal">
                {entry.amount}
              </td>
              <td className="px-6 py-4 text-base  text-[#1DA5DB] font-semibold hover:underline cursor-pointer">
                Download receipt
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
