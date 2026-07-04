import api from "../api";

export async function getAnalytics() {
  const { data } = await api.get("/api/admin/analytics");
  return data.data;
}

export async function getAllRequests(params = {}) {
  const { data } = await api.get("/api/admin/requests", { params });
  return data;
}

export async function assignVolunteer(requestId, volunteerId, volunteerName) {
  const { data } = await api.patch(`/api/admin/requests/${requestId}/assign`, {
    volunteerId,
    volunteerName,
  });
  return data;
}

export async function updateRequestStatus(requestId, status) {
  const { data } = await api.patch(`/api/admin/requests/${requestId}/status`, {
    status,
  });
  return data;
}

export async function getAllUsers(params = {}) {
  const { data } = await api.get("/api/admin/users", { params });
  return data;
}

export async function updateUserRole(userId, role) {
  const { data } = await api.patch(`/api/admin/users/${userId}/role`, { role });
  return data;
}
