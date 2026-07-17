import type { EducationModule } from "@/types/entities";
import type { EducationRepository } from "../interfaces";
import { MOCK_EDUCATION_MODULES } from "@/lib/mock-data/education-modules";

export class MockEducationRepository implements EducationRepository {
  private modules: EducationModule[] = MOCK_EDUCATION_MODULES.map((m) => ({ ...m }));

  async getModules(): Promise<EducationModule[]> {
    return this.modules;
  }

  async setStatus(
    id: string,
    status: EducationModule["status"]
  ): Promise<EducationModule | undefined> {
    const module_ = this.modules.find((m) => m.id === id);
    if (!module_) return undefined;
    module_.status = status;
    return module_;
  }
}
