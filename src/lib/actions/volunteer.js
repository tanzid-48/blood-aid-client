import { toast } from "sonner";
import {
  fetchVolunteerStats,
  fetchAssignedRequests,
  fetchUpdateRequestStatus,
} from "@/lib/api/volunteer";

export async function getVolunteerStatsAction() {
  try {
    const data = await fetchVolunteerStats();
    return { success: true, data };
  } catch {
    toast.error("Failed to load stats.");
    return { success: false, data: null };
  }
}

export async function getAssignedRequestsAction() {
  try {
    const data = await fetchAssignedRequests();
    return { success: true, data };
  } catch {
    toast.error("Failed to load requests.");
    return { success: false, data: [] };
  }
}

export async function updateRequestStatusAction(
  requestId,
  status,
  donorName,
  donorPhone,
) {
  const labels = {
    active: "Request activated ✅",
    fulfilled: "Marked as fulfilled ✅",
    cancelled: "Request cancelled",
  };
  try {
    await fetchUpdateRequestStatus(requestId, status, donorName, donorPhone);
    toast.success(labels[status] || "Updated");
    return { success: true };
  } catch (err) {
    toast.error(err?.response?.data?.error || "Failed to update.");
    return { success: false };
  }
}
