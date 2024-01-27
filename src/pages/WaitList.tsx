import WaitlistTable from "@/Features/WaitList/WaitlistTable";
import PageHeader from "@/components/ui/PageHeader";

export default function Waitlist() {
  return (
    <>
      <div className="h-1 my-10" />
      <PageHeader title="Waitlist" />
      <WaitlistTable />
    </>
  );
}
