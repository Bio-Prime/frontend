export default class PrimersColumns {

    static getUsersColumns = () => {
        const columns = [
            {
                name: "id",
                label: "Id",
                options: {
                    display: 'excluded',
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "name",
                label: "Full name",
                options: {
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "username",
                label: "Username",
                options: {
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "role",
                label: "Role",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "workTitle",
                label: "Work title",
                options: {
                    filter: true,
                    sort: true,
                }
            },
        ];

        return columns;
    }
}
