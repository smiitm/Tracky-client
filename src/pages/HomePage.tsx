import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"

const HomePage = () => {
  return (
    <>
      <Navbar />
      <main>

        <div className='text-5xl text-center p-8'>
          Tracky client it is!
        </div>

        <div className="flex justify-center space-x-4">
          <Button variant="outline" className="mx-2">
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </div>

      </main>
    </>
  );
};

export default HomePage;