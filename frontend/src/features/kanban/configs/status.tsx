type StatusConfigMap = {
  [key: string]: { title: string; color: string };
};

export const STATUS_CONFIG: StatusConfigMap = {
  "to do": { title: "To Do", color: "border-orange-500" },
  "in progress": { title: "In Progress", color: "border-blue-500" },
  review: { title: "Review", color: "border-yellow-500" },
  done: { title: "Done", color: "border-green-500" },
};
