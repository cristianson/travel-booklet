"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitTravelPlan } from "@/api/submitTravelPlan";

export default function TravelPlanForm() {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [travelDetails, setTravelDetails] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await submitTravelPlan(travelDetails);
      if (response.success) {
        toast({
          title: "Success!",
          description: "Your travel plan has been submitted.",
          duration: 3000,
        });
        setTravelDetails(""); // Clear the form
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit travel plan. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
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

  // Return null on server-side
  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <motion.div
        className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex justify-center mb-6"
          variants={childVariants}
        >
          <Image
            src="/travel-logo.png"
            alt="Travel Logo"
            width={200}
            height={60}
            priority
            className="h-15 object-contain"
          />
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <motion.div variants={childVariants}>
            <label
              htmlFor="travelDetails"
              className="block text-lg font-semibold text-gray-900 mb-3"
            >
              Travel Plan Details
            </label>
            <Textarea
              id="travelDetails"
              placeholder="Write your travel plan details here..."
              className="min-h-[200px] text-base p-4"
              value={travelDetails}
              onChange={(e) => setTravelDetails(e.target.value)}
            />
          </motion.div>

          <motion.div variants={childVariants}>
            <Button
              type="submit"
              className="w-full py-6 text-lg font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Travel Plan"
              )}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
