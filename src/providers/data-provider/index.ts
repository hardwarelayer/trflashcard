"use client";

import { dataProvider as dataProviderSupabase } from "@refinedev/supabase";
import { supabaseBrowserClient } from "../../../lib/supabase/client";
import bcrypt from "bcryptjs";

// Custom data provider với password hashing
const baseDataProvider = dataProviderSupabase(supabaseBrowserClient);

export const dataProvider = {
  ...baseDataProvider,
  create: async ({ resource, variables, meta }) => {
    // Hash password cho demo_member
    if (resource === "demo_member" && variables?.password) {
      variables.password = await bcrypt.hash(variables.password, 10);
    }
    return baseDataProvider.create({ resource, variables, meta });
  },
  update: async ({ resource, id, variables, meta }) => {
    // Hash password cho demo_member nếu có thay đổi
    if (resource === "demo_member" && variables?.password && variables.password.trim() !== '') {
      variables.password = await bcrypt.hash(variables.password, 10);
    } else if (resource === "demo_member" && variables?.password === '') {
      // Xóa password field nếu empty
      delete variables.password;
    }
    return baseDataProvider.update({ resource, id, variables, meta });
  },
  getList: baseDataProvider.getList,
  getOne: baseDataProvider.getOne,
  deleteOne: baseDataProvider.deleteOne,
  getApiUrl: baseDataProvider.getApiUrl,
  custom: baseDataProvider.custom,
};
