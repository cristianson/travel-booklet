export async function submitTravelPlan(details: string): Promise<{ success: boolean }> {
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000); // 1 second delay
  });
}

