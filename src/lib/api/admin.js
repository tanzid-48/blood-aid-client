import api from "../api";

// Analytics
export async function fetchAnalytics() {
  const { data } = await api.get("/api/admin/analytics");
  return data.data;
}

// Requests
export async function fetchAllRequests(params = {}) {
  const { data } = await api.get("/api/admin/requests", { params });
  return data;
}

export async function fetchAssignVolunteer(
  requestId,
  volunteerId,
  volunteerName,
) {
  const { data } = await api.patch(`/api/admin/requests/${requestId}/assign`, {
    volunteerId,
    volunteerName,
  });
  return data;
}

export async function fetchUpdateRequestStatus(requestId, status) {
  const { data } = await api.patch(`/api/admin/requests/${requestId}/status`, {
    status,
  });
  return data;
}

export async function fetchDeleteRequest(requestId) {
  const { data } = await api.delete(`/api/admin/requests/${requestId}`);
  return data;
}

// Users
export async function fetchAllUsers(params = {}) {
  const { data } = await api.get("/api/admin/users", { params });
  return data;
}

export async function fetchUpdateUserRole(userId, role) {
  const { data } = await api.patch(`/api/admin/users/${userId}/role`, {
    role,
  });
  return data;
}

export async function fetchSuspendUser(userId, isSuspended) {
  const { data } = await api.patch(`/api/admin/users/${userId}/suspend`, {
    isSuspended,
  });
  return data;
}

export async function fetchDeleteUser(userId) {
  const { data } = await api.delete(`/api/admin/users/${userId}`);
  return data;
}
