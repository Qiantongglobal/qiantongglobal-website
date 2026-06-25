export class UserContext {
    constructor(data) {
        this.corp_id = data.corp_id || '';
        this.corp_name = data.corp_name || '';
        this.emp_id = data.emp_id || '';
        this.name = data.name || '';
        this.avatar = data.avatar || '';
        this.app_id = data.app_id || '';
    }
    get isAuthenticated() {
        return !!this.corp_id;
    }
}
