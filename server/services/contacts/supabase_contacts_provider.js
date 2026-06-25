// ============================================================
// SupabaseContactsProvider
// Self-hosted contacts backed by Supabase.
// Uses the `profiles` table for members and a `departments`
// table for org structure.
//
// Switch to this provider when:
// - User explicitly wants to manage their own contacts
// - External contacts (customers, partners) need to be tracked
//
// profiles table schema:
//   id, emp_id, nick, avatar, role, corp_id
// ============================================================
export class SupabaseContactsProvider {
    constructor(supabase, corpId) {
        this.supabase = supabase;
        this.corpId = corpId;
    }
    // Map profiles row to Employee interface
    // profiles: id, emp_id, nick, avatar, role, corp_id
    // Employee: emp_id, name, avatar, dept_list
    mapProfileToEmployee(row) {
        return {
            emp_id: row.emp_id,
            name: row.nick || '',
            avatar: row.avatar,
            dept_list: [],
        };
    }
    // ---- Employee ----
    async searchEmployees(query, offset = 0, limit = 10) {
        const { data, count, error } = await this.supabase
            .from('profiles')
            .select('id, emp_id, nick, avatar, role, corp_id', { count: 'exact' })
            .eq('corp_id', this.corpId)
            .or(`nick.ilike.%${query}%,emp_id.ilike.%${query}%`)
            .range(offset, offset + limit - 1);
        if (error)
            throw new Error(`SupabaseContactsProvider.searchEmployees: ${error.message}`);
        const total = count ?? 0;
        return {
            items: (data || []).map(row => this.mapProfileToEmployee(row)),
            total,
            offset,
            has_more: offset + limit < total,
        };
    }
    async getEmployeeById(emp_id) {
        const { data, error } = await this.supabase
            .from('profiles')
            .select('id, emp_id, nick, avatar, role, corp_id')
            .eq('corp_id', this.corpId)
            .eq('emp_id', emp_id)
            .single();
        if (error || !data)
            return null;
        return this.mapProfileToEmployee(data);
    }
    async listEmployeesByDept(_dept_id, offset = 0, limit = 50) {
        // Note: dept_id_list not in current profiles schema
        const { data, count, error } = await this.supabase
            .from('profiles')
            .select('id, emp_id, nick, avatar, role, corp_id', { count: 'exact' })
            .eq('corp_id', this.corpId)
            .range(offset, offset + limit - 1);
        if (error)
            throw new Error(`SupabaseContactsProvider.listEmployeesByDept: ${error.message}`);
        const total = count ?? 0;
        return {
            items: (data || []).map(row => this.mapProfileToEmployee(row)),
            total,
            offset,
            has_more: offset + limit < total,
        };
    }
    // ---- Department ----
    async listDepartments(parent_id) {
        let query = this.supabase
            .from('departments')
            .select('dept_id, name, parent_id, member_count, manager_userid, manager_name')
            .eq('corp_id', this.corpId);
        if (parent_id) {
            query = query.eq('parent_id', parent_id);
        }
        else {
            query = query.eq('parent_id', '0');
        }
        const { data, error } = await query;
        if (error)
            throw new Error(`SupabaseContactsProvider.listDepartments: ${error.message}`);
        return data || [];
    }
    async getDepartmentTree(deptId) {
        const parentId = (!deptId || deptId === '-1') ? '0' : deptId;
        let query = this.supabase
            .from('departments')
            .select('dept_id, name, parent_id', { count: 'exact' })
            .eq('corp_id', this.corpId)
            .eq('parent_id', parentId);
        const { data, count, error } = await query;
        if (error)
            throw new Error(`SupabaseContactsProvider.getDepartmentTree: ${error.message}`);
        const rows = (data || []);
        // Check which departments have sub-departments
        const deptIds = rows.map(r => r.dept_id);
        let childCountMap = {};
        if (deptIds.length > 0) {
            const { data: childData } = await this.supabase
                .from('departments')
                .select('parent_id')
                .eq('corp_id', this.corpId)
                .in('parent_id', deptIds);
            for (const row of (childData || [])) {
                childCountMap[row.parent_id] = (childCountMap[row.parent_id] || 0) + 1;
            }
        }
        const deptList = rows.map(r => ({
            dept_id: r.dept_id,
            name: r.name,
            has_children: (childCountMap[r.dept_id] || 0) > 0,
        }));
        return { items: deptList, total: count ?? deptList.length };
    }
    async getDepartmentById(dept_id) {
        const { data, error } = await this.supabase
            .from('departments')
            .select('dept_id, name, parent_id, member_count, manager_userid, manager_name')
            .eq('corp_id', this.corpId)
            .eq('dept_id', dept_id)
            .single();
        if (error || !data)
            return null;
        return data;
    }
    async searchDepts(_key, _offset, _limit) {
        // TODO: implement Supabase-backed department search
        return { items: [], total: 0 };
    }
    // ---- User management ----
    // profiles table is maintained by DB triggers; never insert/update profiles directly.
    // All write operations go through Supabase Auth admin API.
    async listUsers(offset = 0, limit = 20) {
        const { data, count, error } = await this.supabase
            .from('profiles')
            .select('*', { count: 'exact' })
            .eq('corp_id', this.corpId)
            .range(offset, offset + limit - 1);
        if (error)
            throw new Error(`SupabaseContactsProvider.listUsers: ${error.message}`);
        const total = count ?? 0;
        return { items: data || [], total, offset, has_more: offset + limit < total };
    }
    async getUserById(emp_id) {
        const { data, error } = await this.supabase
            .from('profiles')
            .select('*')
            .eq('corp_id', this.corpId)
            .eq('emp_id', emp_id)
            .single();
        if (error || !data)
            return null;
        return data;
    }
    async createUser(input) {
        // Create Supabase Auth user; DB trigger auto-inserts into profiles.
        const { data: authData, error: authError } = await this.supabase.auth.admin.createUser({
            email: input.email,
            password: input.password,
            user_metadata: {
                name: input.name,
                corp_id: input.corp_id,
                role: input.role ?? 'member',
                title: input.title,
                job_number: input.job_number,
                dept_id_list: input.dept_id_list ?? [],
                mobile: input.mobile,
            },
        });
        if (authError || !authData.user) {
            throw new Error(`SupabaseContactsProvider.createUser: ${authError?.message}`);
        }
        // Read the auto-created profile row (written by trigger)
        const profile = await this.getUserById(authData.user.id);
        if (!profile)
            throw new Error('SupabaseContactsProvider.createUser: profile not found after creation');
        return profile;
    }
    async updateUser(emp_id, input) {
        // Update via Auth admin; DB trigger syncs changes to profiles.
        const { error } = await this.supabase.auth.admin.updateUserById(emp_id, {
            user_metadata: { ...input },
        });
        if (error)
            throw new Error(`SupabaseContactsProvider.updateUser: ${error.message}`);
        const profile = await this.getUserById(emp_id);
        if (!profile)
            throw new Error('SupabaseContactsProvider.updateUser: profile not found');
        return profile;
    }
    async deleteUser(emp_id) {
        // Hard delete from Auth; trigger cascades deletion to profiles if configured.
        const { error } = await this.supabase.auth.admin.deleteUser(emp_id);
        if (error)
            throw new Error(`SupabaseContactsProvider.deleteUser: ${error.message}`);
    }
}
