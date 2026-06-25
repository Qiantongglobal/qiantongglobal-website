export class DepartmentService {
    constructor(provider) {
        this.provider = provider;
    }
    list(parent_id) {
        return this.provider.listDepartments(parent_id);
    }
    getTree(deptId) {
        return this.provider.getDepartmentTree(deptId);
    }
    getById(dept_id) {
        return this.provider.getDepartmentById(dept_id);
    }
    search(key, offset, limit) {
        return this.provider.searchDepts(key, offset, limit);
    }
}
