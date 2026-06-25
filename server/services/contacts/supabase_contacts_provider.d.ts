import { SupabaseClient } from '@supabase/supabase-js';
import { IContactsProvider, Employee, Department, DepartmentTreeResult, DeptSearchResult, SearchResult, UserProfile, CreateUserInput, UpdateUserInput } from './interface.js';
export declare class SupabaseContactsProvider implements IContactsProvider {
    private supabase;
    private corpId;
    constructor(supabase: SupabaseClient, corpId: string);
    private mapProfileToEmployee;
    searchEmployees(query: string, offset?: number, limit?: number): Promise<SearchResult<Employee>>;
    getEmployeeById(emp_id: string): Promise<Employee | null>;
    listEmployeesByDept(_dept_id: string, offset?: number, limit?: number): Promise<SearchResult<Employee>>;
    listDepartments(parent_id?: string): Promise<Department[]>;
    getDepartmentTree(deptId?: string): Promise<DepartmentTreeResult>;
    getDepartmentById(dept_id: string): Promise<Department | null>;
    searchDepts(_key: string, _offset?: number, _limit?: number): Promise<DeptSearchResult>;
    listUsers(offset?: number, limit?: number): Promise<SearchResult<UserProfile>>;
    getUserById(emp_id: string): Promise<UserProfile | null>;
    createUser(input: CreateUserInput): Promise<UserProfile>;
    updateUser(emp_id: string, input: UpdateUserInput): Promise<UserProfile>;
    deleteUser(emp_id: string): Promise<void>;
}
