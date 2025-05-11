  import { Suspense } from "react";
  import DashboardPage from "@/components/Dashboard"; 

  export default function Page() {
    return (
      <Suspense fallback={<div className="p-10">Loading dashboard...</div>}>
        <DashboardPage />
      </Suspense>
    );
  }
