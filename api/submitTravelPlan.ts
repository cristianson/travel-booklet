export async function submitTravelPlan(
  details: string
): Promise<{ success: boolean; message?: string }> {
  try {
    // Simulate an API call with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate a successful response
        resolve({ success: true });
      }, 1000); // 1 second delay
    });
  } catch (error) {
    console.error("Error in submitTravelPlan:", error);

    // Return a failure response with a message
    return {
      success: false,
      message: "An error occurred while submitting the travel plan.",
    };
  }
}
