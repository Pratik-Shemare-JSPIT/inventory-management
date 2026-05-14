import {
  getSettings,
  upsertSettings,
} from "@/repositories/settings.repository";

export const getSettingsService = async (user) => {
  return getSettings(user.organizationId);
};

export const updateSettingsService = async (user, data) => {
  return upsertSettings(user.organizationId, data);
};
