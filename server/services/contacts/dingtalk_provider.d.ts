import { IContactsProvider, Employee, Department, DepartmentTreeResult, DeptSearchResult, SearchResult, UserProfile, CreateUserInput, UpdateUserInput } from './interface.js';
export declare class DingtalkContactsProvider implements IContactsProvider {
    private supabaseJwt;
    constructor(supabaseJwt: string);
    private doSearchRequest;
    searchEmployees(query: string, offset?: number, limit?: number): Promise<SearchResult<Employee>>;
    getEmployeeById(emp_id: string): Promise<Employee | null>;
    listEmployeesByDept(_dept_id: string, _offset?: number, _limit?: number): Promise<SearchResult<Employee>>;
    listDepartments(_parent_id?: string): Promise<Department[]>;
    getDepartmentTree(deptId?: string): Promise<DepartmentTreeResult>;
    getDepartmentById(dept_id: string): Promise<Department | null>;
    searchDepts(key: string, offset?: number, limit?: number): Promise<DeptSearchResult>;
    listUsers(): Promise<SearchResult<UserProfile>>;
    getUserById(emp_id: string): Promise<UserProfile | null>;
    createUser(_input: CreateUserInput): Promise<UserProfile>;
    updateUser(_emp_id: string, _input: UpdateUserInput): Promise<UserProfile>;
    deleteUser(_emp_id: string): Promise<void>;
}
