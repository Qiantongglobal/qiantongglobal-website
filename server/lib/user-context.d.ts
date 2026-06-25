export declare class UserContext {
    readonly corp_id: string;
    readonly corp_name: string;
    readonly emp_id: string;
    readonly name: string;
    readonly avatar: string;
    readonly app_id: string;
    constructor(data: {
        corp_id?: string;
        corp_name?: string;
        emp_id?: string;
        name?: string;
        avatar?: string;
        app_id?: string;
    });
    get isAuthenticated(): boolean;
}
