import api from "./axios";

/* Get all published assignments for student */
export const getPublishedAssignments = async () => {
  const res = await api.get("/student/assignments");
  return res.data;
};

/* Submit answer for an assignment */
export const submitAssignment = async (assignmentId, answer) => {
  const res = await api.post(`/student/${assignmentId}`, { answer });
  return res.data;
};

/* Get my submission for one assignment */
export const getMySubmission = async (assignmentId) => {
  const res = await api.get(`/student/${assignmentId}`);
  return res.data;
};
