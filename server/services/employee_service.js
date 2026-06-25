export class EmployeeService {
    constructor(provider) {
        this.provider = provider;
    }
    search(params) {
        return this.provider.searchEmployees(params.query, params.offset, params.limit);
    }
    getById(emp_id) {
        return this.provider.getEmployeeById(emp_id);
    }
    listByDepartment(dept_id, offset, limit) {
        return this.provider.listEmployeesByDept(dept_id, offset, limit);
    }
}
