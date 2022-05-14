import { axiosApi } from './base.api';

export function getCourses() {
    const result = axiosApi({
        url: 'courses',
        method: 'get',
        params: {
            page: 1,
            limit: 20
        }
    });
    return result;
}
