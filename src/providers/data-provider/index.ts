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
    if (resource === "demo_member") {
      if (variables?.new_password && variables.new_password.trim() !== '') {
        // Hash password mới và đổi tên field
        variables.password = await bcrypt.hash(variables.new_password, 10);
        delete variables.new_password;
      } else {
        // Xóa password field nếu không có password mới
        delete variables.password;
        delete variables.new_password;
      }
    }
    return baseDataProvider.update({ resource, id, variables, meta });
  },
  getList: baseDataProvider.getList,
  getOne: baseDataProvider.getOne,
  deleteOne: baseDataProvider.deleteOne,
  getApiUrl: baseDataProvider.getApiUrl,
  custom: baseDataProvider.custom,
};
