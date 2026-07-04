import api from "../api";

export async function getProfile() {
  const { data } = await api.get("/api/users/profile");
  return data.data;
}

export async function updateProfile(formData) {
  const { data } = await api.patch("/api/users/profile", formData);
  return data;
}

export async function becomeDonor() {
  const { data } = await api.patch("/api/users/become-donor");
  return data;
}
