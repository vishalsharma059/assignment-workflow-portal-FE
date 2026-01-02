import api from "./axios";

/* Teacher APIs */

export const createAssignment = async (data) => {
  const res = await api.post("/assignments", data);
  return res.data;
};

export const getAssignments = async (status) => {
  const res = await api.get("/assignments", {
    params: { status },
  });
  return res.data;
};

// Update assignment in draft only
export const updateAssignment = async (id, data) => {
  const res = await api.put(`/assignments/${id}`, data);
  return res.data;
};



export const publishAssignment = async (id) => {
  return api.post(`/assignments/${id}/publish`);
};

export const completeAssignment = async (id) => {
  return api.post(`/assignments/${id}/complete`);
};

export const deleteAssignment = async (id) => {
  return api.delete(`/assignments/${id}`);
};

/* Teacher – view submissions */
export const getSubmissionsByAssignment = async (assignmentId) => {
  const res = await api.get(`/assignments/${assignmentId}/submissions`);
  return res.data;
};
