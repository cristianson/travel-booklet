"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function TravelPlanForm() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  // Only render the motion components on the client side
  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <motion.div
        className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex justify-center mb-6"
          variants={childVariants}
        >
          <Image
            src="/placeholder.svg?height=60&width=200"
            alt="Travel Logo"
            width={200}
            height={60}
            className="h-15"
          />
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={childVariants}>
            <label
              htmlFor="travelDetails"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Travel Plan Details
            </label>
            <Textarea
              id="travelDetails"
              placeholder="Write your travel plan details here..."
              className="min-h-[200px]"
            />
          </motion.div>

          <motion.div variants={childVariants}>
            <Button type="submit" className="w-full">
              Submit Travel Plan
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
