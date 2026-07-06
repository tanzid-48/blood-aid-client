import api from "../api";

export async function fetchVolunteerStats() {
  const { data } = await api.get("/api/volunteer/stats");
  return data.data;
}

export async function fetchAssignedRequests() {
  const { data } = await api.get("/api/volunteer/requests");
  return data.data || [];
}

export async function fetchUpdateRequestStatus(
  requestId,
  status,
  donorName,
  donorPhone,
) {
  const { data } = await api.patch(
    `/api/volunteer/requests/${requestId}/status`,
    {
      status,
      donorName,
      donorPhone,
    },
  );
  return data;
}
