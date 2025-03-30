export interface LinkedInRecommendation {
  id: string;
  name: string;
  position: string;
  content: string;
  date: string;
  linkedInProfile?: string; // Optional LinkedIn profile URL
}

/**
 * This file contains manually added LinkedIn recommendations
 * To add your own recommendations:
 * 1. Go to your LinkedIn profile
 * 2. Scroll to the "Recommendations" section
 * 3. Copy the recommendation text, person's name, position, and date
 * 4. Add a new entry to this array
 */
export const linkedInRecommendations: LinkedInRecommendation[] = [
  {
    id: "1",
    name: "Viren Sinha",
    position: "IIM Lucknow - PGP'26 | SSE @ Paytm",
    content: "I had the pleasure of mentoring Manav, and he consistently impressed me with his technical expertise and proactive approach. His skills in backend development, particularly in Java, Python, and Node.js, were invaluable to our team. Manav is a quick learner who consistently delivered scalable solutions, improving project performance and functionality. He is also a great collaborator, always ready to support the team and share his knowledge. His dedication to code quality and continuous learning makes him an asset to any organization. I highly recommend him for any future roles.",
    date: "2024-08-26",
    linkedInProfile: "https://www.linkedin.com/in/virensinha/"
  }
]; 
