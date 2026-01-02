import { useEffect, useState } from "react";
import { getAssignments } from "../../api/assignmentApi";
import AssignmentForm from "./AssignmentForm";
import AssignmentCard from "../../components/AssignmentCard";
import LayoutShell from "../../components/LayoutShell";

const TeacherDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [status, setStatus] = useState("draft");
  const [isLoading, setIsLoading] = useState(false);

  const fetchAssignments = async () => {
    setIsLoading(true);
    try {
      const data = await getAssignments(status);
      setAssignments(data || []);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [status]);

  return (
    <LayoutShell title="Teacher dashboard">
      <div className="flex flex-col gap-6">
        {/* Header row */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Assignments
            </h2>
            <p className="text-xs text-slate-400">
              Create drafts, publish for students, and mark them completed.
            </p>
          </div>

          {/* Filter pills */}
          <div className="inline-flex items-center gap-1 rounded-full bg-slate-900 p-1 border border-slate-800 text-xs">
            {["draft", "published", "completed"].map((s) => {
              const active = status === s;
              return (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`px-3 py-1 rounded-full capitalize transition ${
                    active
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* Create form */}
        <AssignmentForm refresh={fetchAssignments} />

        {/* List */}
        <section className="mt-2">
          {isLoading ? (
            <div className="flex justify-center py-10 text-sm text-slate-400">
              Loading assignments...
            </div>
          ) : assignments.length === 0 ? (
            <div className="border border-dashed border-slate-700 rounded-xl p-6 text-sm text-slate-400 text-center">
              No assignments in{" "}
              <span className="font-medium text-slate-200">
                {status}
              </span>{" "}
              state yet. Create one above to get started.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {assignments.map((a) => (
                <AssignmentCard
                  key={a._id}
                  assignment={a}
                  refresh={fetchAssignments}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </LayoutShell>
  );
};

export default TeacherDashboard;
