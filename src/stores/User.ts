import {
    types,
    getEnv
} from "mobx-state-tree";

const User = types
    .model('User', {
        name: ''
    })
    .views((self) => ({
        get isAuthenticated() {
            return !!self.name;
        }
    }))
    .actions((self) => {
        return {
            login(username: string, token: string) {
                self.name = username;
                localStorage.setItem('Authorization', token);
            },
            logout() {
                localStorage.setItem('Authorization', '');
                self.name = '';
                console.log("logout finished!")
            },
            afterCreate() {
                self.name = localStorage.getItem('Authorization') || '';
            }
        }
    });

export default User;
