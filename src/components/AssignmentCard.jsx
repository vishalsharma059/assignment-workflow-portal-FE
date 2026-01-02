import { useState } from "react";
import {
  publishAssignment,
  completeAssignment,
  deleteAssignment,
  
} from "../api/assignmentApi";
import AssignmentSubmissionsDrawer from "./AssignmentSubmissionsDrawer";

const AssignmentCard = ({ assignment, refresh }) => {
  const [showSubmissions, setShowSubmissions] = useState(false);

  const publish = async () => {
    await publishAssignment(assignment._id);
    refresh();
  };

  const complete = async () => {
    await completeAssignment(assignment._id);
    refresh();
  };

  const remove = async () => {
    if (!window.confirm("Delete this draft assignment?")) return;
    await deleteAssignment(assignment._id);
    refresh();
  };

  return (
    <>
      <div className="border p-4 rounded bg-white">
        <h3 className="font-bold text-gray-600">{assignment.title}</h3>
        <p className="text-sm text-gray-600">{assignment.description}</p>
        <p className="text-xs mt-1 text-gray-600">
          Due: {new Date(assignment.dueDate).toDateString()}
        </p>

        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {assignment.status === "draft" && (
            <>
              <button
                onClick={publish}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Publish
              </button>
              <button
                onClick={remove}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </>
          )}

          {assignment.status === "published" && (
            <button
              onClick={complete}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Mark Completed
            </button>
          )}

          {/* Teacher view submissions (for published/completed) */}
          {assignment.status !== "draft" && (
            <button
              onClick={() => setShowSubmissions(true)}
              className="px-3 py-1 border border-gray-300 rounded text-gray-700"
            >
              View submissions
            </button>
          )}
        </div>
      </div>

      <AssignmentSubmissionsDrawer
        assignment={assignment}
        open={showSubmissions}
        onClose={() => setShowSubmissions(false)}
      />
    </>
  );
};

export default AssignmentCard;
