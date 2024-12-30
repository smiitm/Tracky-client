import React from "react";
import { useSession } from "../context/SessionContext";
import { Navbar } from "@/components/navbar"
import { LogSession } from "@/components/log-session"

const Dashboard = () => {
  const { session } = useSession();
  return (
    <>
      <Navbar />

      <main className="border-b-2">
        <div className='text-5xl text-center p-8'>
          Tracky dashboard
        </div>
        <div className="flex justify-center my-8">
          <LogSession />
        </div>
      </main>
      
      <footer className="text-center py-2">
        <h1>This is a Protected Page</h1>
        <p>User : {session?.user.email || "None"}</p>
      </footer>
    </>
  );
};

export default Dashboard;