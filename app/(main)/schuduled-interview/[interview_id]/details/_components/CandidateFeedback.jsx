import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

function CandidateFeedbackDialog({ candidate }) {
  // Safely extract and normalize feedback data
  const feedback = candidate?.feedback?.feedback || {};
  const rating = feedback?.rating || {
    TechnicalSkills: 0,
    Communication: 0,
    ProblemSolving: 0,
    Experience: 0,
    Behavioral: 0,
    Thinking: 0
  };

  

  // Handle all possible cases for recommendation message
  const recommendationMessage = 
    feedback?.RecommendationMessage || 
    feedback?.recommendationMessage || 
    feedback?.["Recommendation Message"] || 
    "No recommendation message provided";

  // Handle summary data
  const summaryText = feedback?.summery || feedback?.summary || "";
  const summaryArray = Array.isArray(summaryText) 
    ? summaryText 
    : typeof summaryText === 'string' 
      ? summaryText.split('\n').filter(line => line.trim())
      : [];

  // Calculate overall score
  const ratings = Object.values(rating).filter(val => typeof val === 'number');
  const overallScore = ratings.length > 0 
    ? Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length)
    : 0;

  // Determine recommendation status
  const isRecommended = !feedback?.Recommendation?.toLowerCase().includes('not');

  const getQualitativeFeedback = (score) => {
    if (score >= 8) return "Good";
    if (score >= 5) return "Needs Improvement";
    return "Bad";
  };

  // Email templates
  const emailTemplates = {
    selected: `Subject: Congratulations! You've been selected for further evaluation

Dear ${candidate?.userName || "Candidate"},

We're pleased to inform you that based on your recent interview performance, you've been selected to move forward in our hiring process for the ${candidate?.jobPosition || "the position"} role.

Your performance in the key areas is summarized below:
${Object.entries(rating)
  .map(
    ([skill, score]) =>
      `- ${skill.replace(/([A-Z])/g, " $1").trim()}: ${getQualitativeFeedback(
        score
      )}`
  )
  .join("\n")}

Our team will be in touch shortly to schedule the next phase. In the meantime, feel free to reply to this email with any questions.

Congratulations again!

Best regards,
${candidate?.userName || "Candidate"}
${candidate?.userEmail || "No Email"}`,

    rejected: `Subject: Update on Your Application for ${candidate?.jobPosition || "the position"}

Dear ${candidate?.userName || "Candidate"},

Thank you for taking the time to interview with us for the ${candidate?.jobPosition || "the position"} position. We appreciate the effort you put into the process.

Your performance in the key areas is summarized below:
${Object.entries(rating)
  .map(
    ([skill, score]) =>
      `- ${skill.replace(/([A-Z])/g, " $1").trim()}: ${getQualitativeFeedback(
        score
      )}`
  )
  .join("\n")}

After careful consideration, we've decided to move forward with other candidates whose skills and experience more closely match our current needs.

We wish you the best in your job search and professional endeavors.

Best regards,
${candidate?.userName || "Candidate"}
${candidate?.userEmail || "No Email"}`,

    reevaluate: `Subject: Request for Additional Evaluation for ${candidate?.jobPosition || "the position"}

Dear ${candidate?.userName || "Candidate"},

Thank you for your recent interview for the ${candidate?.jobPosition || "the position"} role. While we found several strengths in your application, we'd like to gather some additional information before making a final decision.

Your performance in the key areas is summarized below:
${Object.entries(rating)
  .map(
    ([skill, score]) =>
      `- ${skill.replace(/([A-Z])/g, " $1").trim()}: ${getQualitativeFeedback(
        score
      )}`
  )
  .join("\n")}

Would you be available for a conversation at your earliest convenience? Please reply with your availability or any questions you might have.

We appreciate your time and interest, and we look forward to continuing the conversation.

Best regards,
${candidate?.userName || "Candidate"}
${candidate?.userEmail || "No Email"}`,
  };

  // Function to open email client with template
  const handleEmailAction = (templateType) => {
    const email = candidate?.userEmail || '';
    const subject = emailTemplates[templateType].split('\n')[0].replace('Subject: ', '');
    const body = emailTemplates[templateType].split('\n').slice(1).join('\n');
    
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-primary hover:bg-primary/10">
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Feedback Report</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-5 space-y-4">
              {/* Candidate Header */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <h2 className="text-white font-bold">
                      {candidate?.userName?.[0]?.toUpperCase() || '?'}
                    </h2>
                  </div>
                  <div>
                    <h2 className="font-bold">{candidate?.userName || 'No Name'}</h2>
                    <h2 className="text-gray-500 text-sm">
                      {candidate?.userEmail || 'No Email'}
                    </h2>
                  </div>
                </div>
                <h2 className="text-primary text-2xl font-bold">
                  {overallScore}/10
                </h2>
              </div>

              {/* Skills Assessment */}
              <div>
                <h2 className="font-bold">Skills Assessment</h2>
                <div className="mt-2 grid grid-cols-2 gap-x-10 gap-y-4">
                  {Object.entries(rating).map(([skill, score]) => (
                    <div key={skill}>
                      <div className="flex justify-between text-sm mb-1">
                        {skill.replace(/([A-Z])/g, ' $1').trim()} 
                        <span>{score}/10</span>
                      </div>
                      <Progress 
                        value={score * 10} 
                        className="h-2 mt-1 [&>div]:bg-primary"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Summary */}
              <div className="mt-5">
                <h2 className="font-bold">Performance Summary</h2>
                <div className="p-5 bg-secondary my-3 rounded-md">
                  {summaryArray.length > 0 ? (
                    summaryArray.map((line, index) => (
                      <p key={index} className="mb-2 last:mb-0">
                        {line}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-500">No summary available</p>
                  )}
                </div>
              </div>

              {/* Recommendation Section */}
              <div className={`p-5 rounded-md ${
                isRecommended ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className={`font-medium text-lg ${
                      isRecommended ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {feedback?.Recommendation || 'Recommendation to Hire'}
                    </h2>
                    <p className="mt-2 whitespace-pre-wrap text-gray-700">
                      {recommendationMessage}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button 
                      onClick={() => handleEmailAction('selected')}
                      variant="outline" 
                      className="text-green-600 border-green-600 hover:bg-green-50"
                    >
                      Selected for Further Evaluation
                    </Button>
                    <Button 
                      onClick={() => handleEmailAction('rejected')}
                      variant="outline" 
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      Rejected
                    </Button>
                    <Button 
                      onClick={() => handleEmailAction('reevaluate')}
                      variant="outline" 
                      className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                    >
                      Request Re-Evaluation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CandidateFeedbackDialog;