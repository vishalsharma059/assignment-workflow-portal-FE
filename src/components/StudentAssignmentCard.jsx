import { useState } from "react";
import { submitAssignment } from "../api/submissionApi";

const StudentAssignmentCard = ({ assignment, submission, refresh }) => {
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const due = new Date(assignment.dueDate);
  const isOverdue = due.getTime() < new Date().setHours(0, 0, 0, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim()) return;
    setIsSubmitting(true);
    try {
      await submitAssignment(assignment._id, answer.trim());
      setAnswer("");
      await refresh(); // re-fetch → submission becomes truthy
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasSubmitted = !!submission;

  return (
    <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-4 hover:border-slate-600 hover:bg-slate-900 transition-all">
    
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold line-clamp-2">{assignment.title}</h3>
          <p className="mt-1 text-xs text-slate-400 line-clamp-2">{assignment.description}</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 text-[10px] font-medium text-blue-200 shrink-0">
          Published
        </span>
      </div>

     
      <div className="text-[11px] text-slate-400 mb-4">
        <span>Due </span>
        <span className={isOverdue ? "text-red-300 font-medium" : "text-slate-200"}>
          {due.toLocaleDateString()}
        </span>
      </div>

   
      {hasSubmitted && submission && (
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3 mb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2 py-px text-[10px] font-medium text-emerald-300">
              Submitted
            </span>
          </div>
          <p className="text-xs text-slate-100 whitespace-pre-wrap mb-2">
            {submission.answer}
          </p>
          <p className="text-[10px] text-slate-400">
            {new Date(submission.createdAt).toLocaleString()}
          </p>
          <p className="mt-1 text-[10px] text-emerald-300">
            Submitted successfully. Cannot edit.
          </p>
        </div>
      )}

   
      {!hasSubmitted && !isOverdue && (
        <form onSubmit={handleSubmit} className="space-y-2">
          <textarea
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-vertical min-h-[80px]"
            placeholder="Type your answer here. Submit once only."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isSubmitting || !answer.trim()}
            className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50 transition"
          >
            {isSubmitting ? "Submitting..." : "Submit answer"}
          </button>
        </form>
      )}

  
      {isOverdue && !hasSubmitted && (
        <div className="mt-3 p-3 rounded-lg bg-red-500/5 border border-red-500/30">
          <p className="text-[11px] text-red-300 text-center">
            Past due date – submissions closed
          </p>
        </div>
      )}

      {(!hasSubmitted && !isOverdue) && !answer && (
        <p className="text-[11px] text-slate-400 text-center mt-3 py-2">
          Ready to submit
        </p>
      )}
    </div>
  );
};

export default StudentAssignmentCard;
