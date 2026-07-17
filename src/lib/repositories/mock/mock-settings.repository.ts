import type { PlatformSettings } from "@/types/entities";
import type { SettingsRepository } from "../interfaces";
import { MOCK_PLATFORM_SETTINGS } from "@/lib/mock-data/settings";

export class MockSettingsRepository implements SettingsRepository {
  private settings: PlatformSettings = { ...MOCK_PLATFORM_SETTINGS };

  async get(): Promise<PlatformSettings> {
    return this.settings;
  }

  async update(patch: Partial<PlatformSettings>): Promise<PlatformSettings> {
    this.settings = { ...this.settings, ...patch };
    return this.settings;
  }
}
