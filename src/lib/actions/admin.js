import { toast } from "sonner";
import {
  fetchAnalytics,
  fetchAllRequests,
  fetchAssignVolunteer,
  fetchUpdateRequestStatus,
  fetchDeleteRequest,
  fetchAllUsers,
  fetchUpdateUserRole,
  fetchSuspendUser,
  fetchDeleteUser,
} from "@/lib/api/admin";

// ── Analytics ──
export async function getAnalyticsAction() {
  try {
    const data = await fetchAnalytics();
    return { success: true, data };
  } catch {
    toast.error("Failed to load analytics.");
    return { success: false, data: null };
  }
}

// ── Requests ──
export async function getAllRequestsAction(params = {}) {
  try {
    const result = await fetchAllRequests(params);
    return { success: true, data: result.data || [], total: result.total || 0 };
  } catch {
    toast.error("Failed to load requests.");
    return { success: false, data: [], total: 0 };
  }
}

export async function assignVolunteerAction(
  requestId,
  volunteerId,
  volunteerName,
) {
  try {
    await fetchAssignVolunteer(requestId, volunteerId, volunteerName);
    toast.success(`Assigned to ${volunteerName} ✅`);
    return { success: true };
  } catch (err) {
    toast.error(err?.response?.data?.error || "Failed to assign.");
    return { success: false };
  }
}

export async function updateRequestStatusAction(requestId, status) {
  const labels = {
    active: "Request activated ✅",
    fulfilled: "Marked as fulfilled ✅",
    cancelled: "Request cancelled",
    pending: "Moved to pending",
  };
  try {
    await fetchUpdateRequestStatus(requestId, status);
    toast.success(labels[status] || "Status updated");
    return { success: true };
  } catch (err) {
    toast.error(err?.response?.data?.error || "Failed to update status.");
    return { success: false };
  }
}

export async function deleteRequestAction(requestId) {
  try {
    await fetchDeleteRequest(requestId);
    toast.success("Request deleted.");
    return { success: true };
  } catch (err) {
    toast.error(err?.response?.data?.error || "Failed to delete.");
    return { success: false };
  }
}

// ── Users ──
export async function getAllUsersAction(params = {}) {
  try {
    const result = await fetchAllUsers(params);
    return { success: true, data: result.data || [], total: result.total || 0 };
  } catch {
    toast.error("Failed to load users.");
    return { success: false, data: [], total: 0 };
  }
}

export async function updateUserRoleAction(userId, role, currentUserId) {
  if (userId === currentUserId) {
    toast.error("You cannot change your own role.");
    return { success: false };
  }
  try {
    await fetchUpdateUserRole(userId, role);
    toast.success(`Role updated to ${role} ✅`);
    return { success: true };
  } catch (err) {
    toast.error(err?.response?.data?.error || "Failed to update role.");
    return { success: false };
  }
}

export async function suspendUserAction(userId, currentStatus, currentUserId) {
  if (userId === currentUserId) {
    toast.error("You cannot suspend yourself.");
    return { success: false };
  }
  const newStatus = !currentStatus;
  try {
    await fetchSuspendUser(userId, newStatus);
    toast.success(newStatus ? "User suspended." : "User activated ✅");
    return { success: true };
  } catch (err) {
    toast.error(err?.response?.data?.error || "Failed.");
    return { success: false };
  }
}

export async function deleteUserAction(userId, currentUserId) {
  if (userId === currentUserId) {
    toast.error("You cannot delete yourself.");
    return { success: false };
  }
  try {
    await fetchDeleteUser(userId);
    toast.success("User deleted.");
    return { success: true };
  } catch (err) {
    toast.error(err?.response?.data?.error || "Failed to delete.");
    return { success: false };
  }
}
