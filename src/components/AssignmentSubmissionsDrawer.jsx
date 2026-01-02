import { useEffect, useState } from "react";
import { getSubmissionsByAssignment } from "../api/assignmentApi";

const AssignmentSubmissionsDrawer = ({ assignment, open, onClose }) => {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadSubmissions = async () => {
    if (!assignment?._id) return;
    setIsLoading(true);
    try {
      const data = await getSubmissionsByAssignment(assignment._id);
      setSubmissions(data || []);
    } catch (err) {
      console.error("Failed to load submissions", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      loadSubmissions();
    }
  }, [open, assignment?._id]);

  if (!open || !assignment) return null;

  return (
    <div className="fixed inset-0 z-40 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />

      <div className="w-full max-w-md bg-slate-950 text-slate-50 border-l border-slate-800 flex flex-col">
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">Submissions</h3>
            <p className="text-[11px] text-slate-400 line-clamp-1">
              {assignment.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-slate-200"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {isLoading ? (
            <p className="text-xs text-slate-400">Loading submissions...</p>
          ) : submissions.length === 0 ? (
            <p className="text-xs text-slate-400">
              No students have submitted this assignment yet.
            </p>
          ) : (
            submissions.map((s) => (
              <div
                key={s._id}
                className="rounded-lg border border-slate-800 bg-slate-900/70 p-3 text-xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold">
                    {s.studentId?.name || "Unnamed student"}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {new Date(s.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="text-slate-100 whitespace-pre-wrap">{s.answer}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentSubmissionsDrawer;
