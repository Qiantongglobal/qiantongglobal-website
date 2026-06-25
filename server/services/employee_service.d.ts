import { IContactsProvider, Employee, SearchResult } from './contacts/interface.js';
export type { Employee, SearchResult };
export declare class EmployeeService {
    private provider;
    constructor(provider: IContactsProvider);
    search(params: {
        query: string;
        offset?: number;
        limit?: number;
    }): Promise<SearchResult<Employee>>;
    getById(emp_id: string): Promise<Employee | null>;
    listByDepartment(dept_id: string, offset?: number, limit?: number): Promise<SearchResult<Employee>>;
}
