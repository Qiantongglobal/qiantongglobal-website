import { IContactsProvider, Department, DepartmentTreeResult, DeptSearchResult } from './contacts/interface.js';
export type { Department, DepartmentTreeResult, DeptSearchResult };
export declare class DepartmentService {
    private provider;
    constructor(provider: IContactsProvider);
    list(parent_id?: string): Promise<Department[]>;
    getTree(deptId?: string): Promise<DepartmentTreeResult>;
    getById(dept_id: string): Promise<Department | null>;
    search(key: string, offset?: number, limit?: number): Promise<DeptSearchResult>;
}
