export const getSenatorsByStatus = (allSenators) => (
    allSenators.reduce((acc, cur) => {
        if (!acc[cur.status]) {
            acc[cur.status] = [cur]
        } else {
            acc[cur.status].push(cur)
        }
        return acc;
    }, {})
)