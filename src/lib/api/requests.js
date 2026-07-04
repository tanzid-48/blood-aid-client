import api from "../api";

export async function getMyRequests() {
  const { data } = await api.get("/api/requests/my");
  return data.data || [];
}

export async function createRequest(formData) {
  const { data } = await api.post("/api/requests", formData);
  return data;
}

export async function cancelRequest(id) {
  const { data } = await api.patch(`/api/requests/${id}/cancel`);
  return data;
}