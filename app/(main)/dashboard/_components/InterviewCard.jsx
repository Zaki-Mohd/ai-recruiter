import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Send } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

function InterviewCard({ interview, detail = false }) {
  const url =
    process.env.NEXT_PUBLIC_HOST_URL + "/interview" + interview?.interview_id;

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast("Copied");
  };

  const onSend = () => {
    toast("Sending Email");
    window.location.href =
      "mailto:zlol5696@gmail.com?subject=AICruiter Interview Link &body=Interview Link :" +
      url;
  };

  return (
    <div className="p-5 bg-white rounded-lg border">
      <div className="flex items-center justify-between">
        <div className="h-[40px] w-[40px] bg-primary rounded-full"></div>
        <h2 className="text-sm">
          {moment(interview?.created_at).format("DD MMM yyyy")}
        </h2>
      </div>

      <h2 className="mt-3 font-bold text-lg">{interview?.jobPosition}</h2>
      <h2 className="mt-2 flex justify-between">
        {interview?.duration}
        <span>{interview["interview-feedback"]?.length} Candidates</span>
      </h2>

      {!detail ? (
        <div className="flex gap-3 mt-4">
          <Button
            variant="outline"
            className="w-full flex-1 hover:bg-gray-100 hover:text-black transition"
            onClick={copyLink}
          >
            <Copy className="mr-2" />
            Copy Link
          </Button>

          <Button
            className="w-full flex-1 hover:bg-primary/80 transition"
            onClick={onSend}
          >
            <Send className="mr-2" />
            Send
          </Button>
        </div>
      ) : (
        <Link
          href={"/schuduled-interview/" + interview?.interview_id + "/details"}
        >
          <Button className="mt-5 w-full" variant="outline">
            View Details <ArrowRight />
          </Button>
        </Link>
      )}
    </div>
  );
}

export default InterviewCard;
