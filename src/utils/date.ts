const today = new Date();
const startOfDay = new Date(today.setHours(0, 0, 0, 0));
const endOfDay = new Date(today.setHours(23, 59, 59, 999));
const startOfYesterday = new Date(today.setDate(today.getDate() - 1));
export const endOfYesterday = new Date(today.setHours(23, 59, 59, 999));

// export const yesterday = startOfYesterday;

export const currentDate = {
  gte: startOfDay,
  lt: endOfDay,
};

export const nowDate = new Date();
