type StatusConfigMap = {
  [key: string]: { title: string; color: string };
};

export const STATUS_CONFIG: StatusConfigMap = {
  "To Do": { title: "To Do", color: "border-orange-500" },
  "In Progress": { title: "In Progress", color: "border-blue-500" },
  Review: { title: "Review", color: "border-yellow-500" },
  Done: { title: "Done", color: "border-green-500" },
};
