import { useEffect, useState } from "react";
import {
  getPublishedAssignments,
  getMySubmission,
} from "../../api/submissionApi";
import StudentAssignmentCard from "../../components/StudentAssignmentCard";
import LayoutShell from "../../components/LayoutShell";

const StudentDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
     
      const assignmentsData = await getPublishedAssignments();
      setAssignments(assignmentsData || []);

      const submissionEntries = await Promise.all(
        assignmentsData.map(async (a) => {
          const s = await getMySubmission(a._id);
          return [a._id, s];
        })
      );

      const submissionsMap = {};
      submissionEntries.forEach(([id, sub]) => {
        submissionsMap[id] = sub;
      });
      setSubmissions(submissionsMap);
    } catch (err) {
      console.error("Failed to load student dashboard", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <LayoutShell title="Student dashboard">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            My assignments
          </h2>
          <p className="text-xs text-slate-400">
            View all published assignments and submit your answers once.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10 text-sm text-slate-400">
            Loading assignments...
          </div>
        ) : assignments.length === 0 ? (
          <div className="border border-dashed border-slate-700 rounded-xl p-6 text-sm text-slate-400 text-center">
            No published assignments yet. Check back later.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {assignments.map((a) => (
              <StudentAssignmentCard
                key={a._id}
                assignment={a}
                submission={submissions[a._id] || null}
                refresh={fetchData}
              />
            ))}
          </div>
        )}
      </div>
    </LayoutShell>
  );
};

export default StudentDashboard;
