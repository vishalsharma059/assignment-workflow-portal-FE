import { useState } from "react";
import { createAssignment } from "../../api/assignmentApi";

const AssignmentForm = ({ refresh }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!title || !description || !dueDate) return;

    setIsSubmitting(true);
    try {
      await createAssignment({
        title,
        description,
        dueDate,
      });
      setTitle("");
      setDescription("");
      setDueDate("");
      refresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold">Create assignment</h3>
          <p className="text-[11px] text-slate-400">
            New assignments start as drafts. Publish when ready.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1 sm:col-span-2">
          <label className="text-[11px] text-slate-300">Title</label>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/70"
            placeholder="e.g. Algebra Homework – Chapter 3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1 sm:col-span-2">
          <label className="text-[11px] text-slate-300">Description</label>
          <textarea
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/70 min-h-[80px]"
            placeholder="Briefly describe the task, expectations, and any resources."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] text-slate-300">Due date</label>
          <input
            type="date"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/70"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div className="flex items-end justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-lg bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-900 hover:bg-white disabled:opacity-60 transition"
          >
            {isSubmitting ? "Saving..." : "Save draft"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AssignmentForm;
